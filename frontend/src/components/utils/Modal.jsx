import DimBg from "./DimBg"
import { motion } from "framer-motion"

function Modal({ children, toggleModal, isModalOpen }) {
	return (
		<DimBg isOpen={isModalOpen} toggleOpen={toggleModal}>
			{isModalOpen && (
				<motion.aside
					className={`relative h-[60%] rounded-2xl  bg width-transition w-[80%] md:w-[60%] p-6 z-20`}
					onClick={toggleModal}
					initial={{ opacity: 0, height: 0, maxWidth: 0 }}
					animate={{
						opacity: 1,
						height: "60%",
						maxWidth: "100%",
					}}
					exit={{ opacity: 0, height: 0, maxWidth: 0 }}
					transition={{ when: "afterChildren", duration: 0.15 }}
					key={"modal"}
				>
					<motion.div
						className={`flex flex-col h-full  items-center justify-evenly gap-6`}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.05 }}
					>
						{children}
					</motion.div>
				</motion.aside>
			)}
		</DimBg>
	)
}
export default Modal
