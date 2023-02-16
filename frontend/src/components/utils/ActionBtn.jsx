import { AnimatePresence, motion } from "framer-motion"
import { useAppContext } from "../../context/appContext"
import { AiOutlinePlus } from "react-icons/ai"
import ActionInnerBtns from "./ActionInnerBtns"

function ActionBtn() {
	const { toggleActionButton, isActionButtonOpen } = useAppContext()
	const variants = {
		rotate: { rotate: 45 },
		stop: { rotate: 0 },
	}

	return (
		<>
			<motion.button
				type='button'
				className='fixed md:absolute bottom-5 right-5 z-10 shadow-md rounded-full p-2 bg-white dark:bg-black'
				variants={variants}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 1.08 }}
				animate={isActionButtonOpen ? "rotate" : "stop"}
				transition={{ type: "tween", duration: 0.2 }}
				onClick={() => {
					toggleActionButton()
				}}
			>
				<AiOutlinePlus size={"36px"} />
			</motion.button>
			<ActionInnerBtns />
		</>
	)
}
export default ActionBtn
