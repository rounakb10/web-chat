const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} = require("../errors/index.js")

const createChat = async (req, res) => {
	const { userId } = req.body
	if (!userId) {
		throw new BadRequestError("UserID param not sent")
	}

	var isChat = await Chat.find({
		isGroupChat: false,
		$and: [
			{ users: { $elemMatch: { $eq: req.user.userId } } },
			{ users: { $elemMatch: { $eq: userId } } },
		],
	})
		.populate("users")
		.populate("latestMessage")

	isChat = await User.populate(isChat, {
		path: "latestMessage.sender",
		select: "name pic email",
	})

	if (isChat.length > 0) {
		res.json(isChat[0])
	} else {
		var chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user.userId, userId],
		}

		const createdChat = await Chat.create(chatData)

		const FullChat = await Chat.findOne({
			_id: createdChat._id,
		}).populate("users")

		res.status(StatusCodes.OK).send(FullChat)
	}
}

const fetchChats = async (req, res) => {
	var data = await Chat.find({
		users: { $elemMatch: { $eq: req.user.userId } },
	})
		.populate("users")
		.populate("groupAdmin")
		.populate("latestMessage")
		.sort({ updatedAt: -1 })

	data = await User.populate(data, {
		path: "latestMessage.sender",
		select: "name pic email",
	})

	res.status(StatusCodes.OK).json(data)
}

const createGroupChat = async (req, res) => {
	if (!req.body.users || !req.body.name) {
		throw new BadRequestError("Provide all fields")
	}

	var users = JSON.parse(req.body.users)

	if (users.length < 2) {
		throw new BadRequestError("More than 2 users required to form a group")
	}

	users.push(req.user.userId)

	const data = await Chat.create({
		chatName: req.body.name,
		users: users,
		isGroupChat: true,
		groupAdmin: req.user.userId,
	})

	const groupChat = await Chat.findOne({ _id: data._id })
		.populate("users")
		.populate("groupAdmin")

	res.status(StatusCodes.OK).json(groupChat)
}

const renameGroupChat = async (req, res) => {
	const { chatId, chatName } = req.body

	const updatedGroup = await Chat.findByIdAndUpdate(
		chatId,
		{
			chatName,
		},
		{ new: true }
	)
		.populate("users")
		.populate("groupAdmin")

	if (!updatedGroup) {
		throw NotFoundError("Group not found")
	}

	res.status(StatusCodes.OK).json(updatedGroup)
}

const addToGroupChat = async (req, res) => {
	const { chatId, userId } = req.body

	//Check if user is admin
	const chat = await Chat.findById({ _id: chatId })
	if (chat.groupAdmin.toString() !== req.user.userId) {
		throw new UnauthenticatedError("Not authorized")
	}

	const updatedGroup = await Chat.findByIdAndUpdate(
		chatId,
		{ $addToSet: { users: userId } },
		{ new: true }
	)
		.populate("users")
		.populate("groupAdmin")

	if (!updatedGroup) {
		throw NotFoundError("Group not found")
	}
	res.status(StatusCodes.OK).json(updatedGroup)
}

const removeFromGroupChat = async (req, res) => {
	const { chatId, userId } = req.body

	const chat = await Chat.findById({ _id: chatId })

	//Check if req user is admin. If not, its not allowed
	if (chat.groupAdmin.toString() !== req.user.userId) {
		throw new UnauthenticatedError("Not authorized")
	}

	//Check if provided user is admin. If yes, its not allowed
	if (chat.groupAdmin.toString() === userId) {
		throw new BadRequestError("Cannot remove admin")
	}

	const updatedGroup = await Chat.findByIdAndUpdate(
		chatId,
		{ $pull: { users: userId } },
		{ new: true }
	)
		.populate("users")
		.populate("groupAdmin")

	if (!updatedGroup) {
		throw NotFoundError("Group not found")
	}
	res.status(StatusCodes.OK).json(updatedGroup)
}

module.exports = {
	createChat,
	fetchChats,
	createGroupChat,
	renameGroupChat,
	addToGroupChat,
	removeFromGroupChat,
}
