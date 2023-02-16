import { AnimatePresence, motion } from "framer-motion"
import { useAppContext } from "../../context/appContext"
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai"
import ActionInnerBtn from "./ActionInnerBtn"

function ActionInnerBtns() {
	const {
		isActionButtonOpen,
		toggleSidebar,
		toggleGroupSidebar,
		toggleActionButton,
	} = useAppContext()
	const groupVariants = {
		initial: { scale: 0, bottom: 0, right: -45 },
		animate: { scale: 1, bottom: 120, right: 0 },
		exit: { scale: 0, bottom: 0, right: -45 },
	}
	const userVariants = {
		initial: { scale: 0, bottom: 0, right: -45 },
		animate: { scale: 1, bottom: 70, right: 0 },
		exit: { scale: 0, bottom: 0, right: -45 },
	}
	return (
		<AnimatePresence>
			{isActionButtonOpen && (
				<div className='fixed md:absolute bottom-5 right-5 z-10'>
					<ActionInnerBtn
						toggleSidebar={toggleSidebar}
						variants={userVariants}
						Icon={AiOutlineUserAdd}
						text='Add User'
					/>
					<ActionInnerBtn
						toggleSidebar={toggleGroupSidebar}
						variants={groupVariants}
						Icon={AiOutlineUsergroupAdd}
						text='Create Group'
					/>
				</div>
			)}
		</AnimatePresence>
	)
}
export default ActionInnerBtns
