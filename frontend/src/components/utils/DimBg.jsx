import { AnimatePresence, motion } from "framer-motion"

function DimBg({ children, isOpen, toggleOpen }) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={`absolute flex flex-col items-center justify-center z-20 h-screen transition-[visibility] bg-black/50 dark:bg-black/50 w-full`}
					onClick={toggleOpen}
					key={"dimBg"}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	)
}
export default DimBg
