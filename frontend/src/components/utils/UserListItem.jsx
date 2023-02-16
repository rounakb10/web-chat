import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/appContext"

function UserListItem({ user }) {
	const { createChat, toggleSidebar, isGroupSidebar, addUserToGroupList } =
		useAppContext()
	// const navigate = useNavigate()
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = () => {
		if (isGroupSidebar) {
			addUserToGroupList(user)
			return
		}
		createChat(user)
		toggleSidebar()
		if (location.pathname === "/") navigate("/chat")

		// navigate("/chat")
	}
	return (
		<motion.div
			onClick={handleClick}
			whileHover={{
				scaleY: 1.03,
				scaleX: 1.01,
				// backgroundColor: "rgba(0,0,0,0.2)",
			}}
			transition={{ type: "tween", duration: 0.2 }}
			className='flex gap-3 py-2 px-2 rounded-xl bg-white/30 dark:bg-black/40 cursor-pointer default-transition'
		>
			<img
				src={user.pic}
				alt={`${user.name} profile`}
				className='rounded-full w-12'
			/>
			<div className='flex flex-col overflow-hidden'>
				<span>{user.name}</span>
				<span>{user.email}</span>
			</div>
		</motion.div>
	)
}
export default UserListItem
