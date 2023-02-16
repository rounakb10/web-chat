const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const Message = require("../models/messageModel")

const { StatusCodes } = require("http-status-codes")
const {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} = require("../errors/index.js")

const sendMessage = async (req, res) => {
	const { content, chatId } = req.body

	if (!content || !chatId) {
		throw new BadRequestError("Invalid request")
	}

	let newMessage = {
		sender: req.user.userId,
		content: content,
		chat: chatId,
	}

	let message = await Message.create(newMessage)
	message = await message.populate("sender", "name pic")
	message = await message.populate("chat")
	message = await User.populate(message, {
		path: "chat.users",
		select: "name pic email",
	})

	await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message })

	res.json(message)
	// res.json({ msg: "hi" })
}

const allMessages = async (req, res) => {
	const messages = await Message.find({ chat: req.params.chatId })
		.populate("sender", "name pic email")
		.populate("chat")
		.sort({ updatedAt: -1 })

	res.json(messages)
}

module.exports = { sendMessage, allMessages }
