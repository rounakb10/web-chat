import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../../context/appContext"

function CreateGroupBtn() {
	const {
		createGroupChat,
		selectedGroupUsers,
		groupName,
		toggleGroupSidebar,
	} = useAppContext()

	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = () => {
		createGroupChat()
		toggleGroupSidebar()
		if (location.pathname === "/") navigate("/chat")
	}
	return (
		<motion.button
			type='button'
			onClick={handleClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 1.01 }}
			disabled={selectedGroupUsers.size < 2 || !groupName}
			className='w-60 md:w-full mt-auto bg-emerald-400 dark:bg-emerald-500 dark:text-black disabled:bg-neutral-300 disabled:dark:bg-neutral-700 disabled:cursor-not-allowed rounded-full py-2'
		>
			Create Group
		</motion.button>
	)
}
export default CreateGroupBtn
