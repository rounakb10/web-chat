import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/appContext"

function MyChatItem({ chat }) {
	const { user, toggleChat } = useAppContext()
	const sender = chat.isGroupChat
		? chat.chatName
		: user.email === chat.users[0].email
		? chat.users[1]
		: chat.users[0]
	const navigate = useNavigate()
	const location = useLocation()
	return (
		<motion.div
			onClick={() => {
				toggleChat({ chat })
				if (location.pathname === "/") navigate("/chat")
			}}
			whileHover={{ scaleY: 1.03, scaleX: 1.01 }}
			whileTap={{ scaleY: 1.025, scaleX: 1.005 }}
			className='flex bg-white/50 md:bg-white dark:bg-black/50 px-4 py-4 rounded-lg gap-3 cursor-pointer'
		>
			{(sender || chat.pic) && (
				<img
					src={sender.pic || chat.pic}
					alt={
						chat.pic
							? `generic group image`
							: `${sender.name} profile`
					}
					className='w-12 h-12 rounded-full'
				/>
			)}
			{sender && (
				<div className='flex flex-col overflow-hidden'>
					<span>
						{chat.isGroupChat ? chat.chatName : sender.name}
					</span>
					<span>
						{chat.latestMessage ? chat.latestMessage.content : ""}
					</span>
				</div>
			)}
		</motion.div>
	)
}
export default MyChatItem
