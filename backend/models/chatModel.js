const mongoose = require("mongoose")

const chatSchema = mongoose.Schema(
	{
		chatName: {
			type: String,
			trim: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		pic: {
			type: String,
			default: "https://ik.imagekit.io/yqjkcggya/team-placeholder.png",
		},
	},
	{ timestamps: true }
)

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat
