import { useEffect } from "react"
import Navbar from "../components/Navbar"
import ProfileModal from "../components/ProfileModal"
import Sidebar from "../components/Sidebar"
import { useAppContext } from "../context/appContext"
import ChatBox from "../components/chat/ChatBox"
import MyChats from "../components/chat/MyChats"
import { useLocation, useNavigate } from "react-router-dom"
import EditGroupModal from "../components/chat/EditGroupModal"

function ChatPage() {
	const {
		currentChat,
		isChatOpen,
		toggleChat,
		socket,
		socketConnected,
		setSocketConnected,
		user,
	} = useAppContext()

	useEffect(() => {
		if (!socketConnected) {
			socket.emit("setup", user)
			socket.on("connection", () => setSocketConnected(true))
		}
	}, [])
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/") toggleChat({ currentChat })
	}, [location])

	return (
		<>
			<Sidebar />
			<ProfileModal />
			{currentChat && <EditGroupModal />}
			<div className='block md:flex flex-col w-screen gap-3'>
				<Navbar />
				<div className=' overflow-x-hidden md:hidden'>
					{isChatOpen ? <ChatBox /> : <MyChats />}
				</div>
				<div className='hidden md:flex gap-4 h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]  justify-between md:mx-3'>
					<MyChats />
					<ChatBox />
				</div>
			</div>
		</>
	)
}
export default ChatPage
