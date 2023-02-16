import { useAppContext } from "../../context/appContext"
import {
	AiOutlineArrowLeft,
	AiOutlineSend,
	AiOutlineSetting,
} from "react-icons/ai"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { isEmpty } from "lodash-es"
import Messages from "./Messages"

function ChatBox() {
	const navigate = useNavigate()

	const {
		socket,
		currentChat,
		user,
		toggleGroupModal,
		sendMessage,
		messages,
		addMessage,
		fetchChats,
	} = useAppContext()

	useEffect(() => {
		if (!socket) return
		socket.on("message received", (newMessageReceived) => {
			fetchChats()
			if (
				currentChat &&
				currentChat._id === newMessageReceived.currentChat._id
			) {
				addMessage({ message: newMessageReceived })
			}
		})
	})

	const [content, setContent] = useState("")
	if (!currentChat || isEmpty(currentChat)) {
		return (
			<div className='hidden md:block justify-between md:basis-2/3 lg:basis-3/4 xl:basis-4/5 2xl:basis-11/12 md:rounded-lg md:p-4 md:bg-white/70 md:dark:bg-black/40'>
				{" "}
			</div>
		)
	}

	const isGC = currentChat.isGroupChat
	const sender = isGC
		? currentChat.chatName
		: user.email === currentChat.users[0].email
		? currentChat.users[1]
		: currentChat.users[0]
	// const msg = JSON.parse(messages)
	return (
		// <AnimatePresence>
		<motion.div
			className={`flex flex-col justify-between h-screen md:h-full md:basis-2/3 lg:basis-3/4 xl:basis-4/5 2xl:basis-11/12 md:rounded-lg md:p-4 md:bg-white/70 md:dark:bg-black/40`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, type: "tween" }}
		>
			<header className='sticky top-0 flex justify-start items-center gap-2 bg-white dark:bg-black/50 p-3 md:rounded-xl'>
				<button
					onClick={() => {
						navigate(-1)
					}}
					className='md:hidden'
				>
					<AiOutlineArrowLeft size={"24px"} />
				</button>
				{(sender.pic || currentChat.pic) && (
					<img
						src={sender.pic || currentChat.pic}
						alt={`${sender.name || "generic group"} profile`}
						className='rounded-full w-10 h-10'
					/>
				)}
				<h1 className='text-xl'>{isGC ? sender : sender.name}</h1>
				{isGC && (
					<motion.button
						onClick={toggleGroupModal}
						className='ml-auto'
						whileHover={{ scale: 1.1 }}
					>
						<AiOutlineSetting size={"24px"} />
					</motion.button>
				)}
			</header>

			<Messages isGC={isGC} />

			<form
				onSubmit={(e) => {
					e.preventDefault()
					sendMessage({ content, chatId: currentChat._id })
					setContent("")
				}}
				className=' flex items-center justify-between p-2 gap-1 bg-white dark:bg-black/50 md:rounded-xl w-full'
			>
				<input
					type='text'
					className='px-3 py-2 basis-full max-h-48 md:rounded-xl bg-transparent focus:outline-none'
					value={content}
					onChange={(e) => {
						setContent(e.target.value)
					}}
				/>
				<motion.button
					type='submit'
					className='rounded-full p-2 cursor-pointer bg'
					whileHover={{ scale: 1.03 }}
					transition={{ type: "tween", duration: 0.2 }}
				>
					<AiOutlineSend size={"26px"} />
				</motion.button>
			</form>
		</motion.div>
		// </AnimatePresence>
	)
}
export default ChatBox
