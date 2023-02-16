const express = require("express")
const app = express()
require("dotenv").config()

require("express-async-errors")

// const { chats } = require("./data/data")
const connectDB = require("./db/connect")

app.use(express.json())

//middleware
const errorHandlerMiddleware = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")
const authenticateUser = require("./middleware/auth")

// app.get("/api/chat", (req, res) => {
// 	console.log(chats)
// 	res.json(chats)
// })

// app.get("/api/chat/:id", (req, res) => {
// 	const singleChat = chats.find((chat) => chat._id === req.params.id)
// 	res.json(singleChat)
// })

const authRouter = require("./routers/authRouter")
const chatRouter = require("./routers/chatRouter")
const messageRouter = require("./routers/messageRouter")

app.use("/api/auth", authRouter)
app.use("/api/chat", authenticateUser, chatRouter)
app.use("/api/message", authenticateUser, messageRouter)
// app.use('/api/chats', chatRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
	try {
		const conn = await connectDB(process.env.MONGO_URL)
		console.log(`MongoDB connected : ${conn.connection.host}`)
		const server = app.listen(port, () => {
			console.log(`Server started on PORT : ${port}`)
		})

		const io = require("socket.io")(server, {
			pingTimeout: 60000,
			cors: { origin: "http://localhost:3000" },
		})

		io.on("connection", (socket) => {
			console.log("connected to socket.io")

			socket.on("setup", (userData) => {
				socket.join(userData._id)
				console.log(userData.email)
				socket.emit("connected")
			})

			socket.on("join chat", (room) => {
				socket.join(room)
				// console.log("socket.on ~ room", room)
			})

			socket.on("new message", (newMessageReceived) => {
				var chat = newMessageReceived.chat
				// console.log(chat)
				if (!chat.users) return console.log("chat.users not defined")

				chat.users.forEach((user) => {
					if (user._id === newMessageReceived.sender._id) return
					socket
						.in(user._id)
						.emit("message received", newMessageReceived)
				})
			})
		})
	} catch (error) {
		console.log(error.message)
	}
}

start()
