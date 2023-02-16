import { motion } from "framer-motion"
import { useAppContext } from "../context/appContext"
function Navbar() {
	const { user, toggleProfileModal, isChatOpen } = useAppContext()

	return (
		<nav
			className={`bg-white/40 dark:bg-black/40 flex flex-row ${
				isChatOpen && "hidden md:flex"
			} justify-between items-center w-full h-16 px-2 sm:px-4 select-none`}
		>
			<h1 className={`capitalize text-2xl md:text-3xl`}>chatify</h1>

			<motion.button
				onClick={toggleProfileModal}
				className={`basis-auto flex rounded-full gap-4 items-center`}
				whileHover={{ scale: 1.1 }}
				transition={{ type: "tween", duration: 0.2 }}
			>
				<img
					src={user.pic}
					className='rounded-full cursor-pointer shadow-sm w-8 h-8'
				></img>
			</motion.button>
		</nav>
	)
}
export default Navbar
