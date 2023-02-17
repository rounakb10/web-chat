import { motion } from "framer-motion"
import { useAppContext } from "../../context/appContext"

function ActionInnerBtn({ toggleSidebar, variants, Icon, text }) {
	const { toggleActionButton } = useAppContext()
	return (
		<motion.button
			className='absolute flex justify-center items-center w-40 gap-2 z-10 rounded-full shadow-md bg-white dark:bg-black capitalize py-1 px-2'
			variants={variants}
			initial='initial'
			animate='animate'
			exit='exit'
			onClick={() => {
				toggleSidebar()
				toggleActionButton()
			}}
			whileHover={{ scale: 1.03 }}
			whileTap={{ scale: 1.02 }}
		>
			<Icon size={"26px"} />
			<span>{text}</span>
		</motion.button>
	)
}
export default ActionInnerBtn
