import { useAppContext } from "../../context/appContext"
import MyChatItem from "../utils/MyChatItem"
import ActionBtn from "../utils/ActionBtn"
import { useEffect } from "react"

function MyChats() {
	const { chats, fetchChats, socket } = useAppContext()

	useEffect(() => {
		fetchChats()
		//eslint-disable-next-line
	}, [])

	useEffect(() => {
		chats.map((chat) => {
			socket.emit("join chat", chat._id)
		})
	}, [chats])

	return (
		<div
			className={`flex flex-col relative gap-3 h-[calc(100vh-4rem)] md:h-full rounded-lg md:bg-white/70 md:dark:bg-black/40 basis-full md:basis-1/3 select-none`}
		>
			<ActionBtn />

			{chats.length === 0 && (
				<div className='flex h-full items-center self-center'>
					<p>Add a chat...</p>
				</div>
			)}
			<div className='flex flex-col overflow-x-hidden px-2 md:px-4 py-2 md:py-4 md:scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-white dark:scrollbar-thumb-black/30 scrollbar-track-transparent  gap-3'>
				{chats.map((chat) => {
					return <MyChatItem key={chat._id} chat={chat} />
				})}
			</div>
		</div>
	)
}
export default MyChats
