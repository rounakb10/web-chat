import { useAppContext } from "../context/appContext"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import DimBg from "./utils/DimBg"
import UserList from "./UserList"
import SearchBox from "./utils/SearchBox"
import { motion } from "framer-motion"
import GroupNameInput from "./utils/GroupNameInput"
import SelectedUsers from "./utils/SelectedUsers"
import CreateGroupBtn from "./utils/CreateGroupBtn"

function Sidebar() {
	const {
		isSidebarOpen,
		toggleSidebar,
		isGroupSidebar,
		toggleGroupSidebar,
		createGroupChat,
	} = useAppContext()
	const handleClose = () => {
		if (isGroupSidebar) {
			toggleGroupSidebar()
			return
		}
		toggleSidebar()
	}
	return (
		<DimBg isOpen={isSidebarOpen} toggleOpen={handleClose}>
			{isSidebarOpen && (
				<motion.aside
					className={`absolute left-0 w-[40%] lg:w-[30%] xl:w-[25%] hidden md:flex flex-col gap-4 px-2 lg:px-4 py-5 h-full bg bg-white dark:bg-black z-20`}
					key={"sidebarLg"}
					onClick={(e) => {
						e.stopPropagation()
					}}
					initial={{ maxWidth: 0, opacity: 0 }}
					animate={{ maxWidth: "40%", opacity: 1 }}
					exit={{ maxWidth: 0, opacity: 0 }}
					transition={{
						when: "afterChildren",
						duration: 0.15,
					}}
				>
					<div className='flex gap-3 items-center'>
						<motion.button
							type='button'
							onClick={handleClose}
							whileHover={{ scale: 1.05 }}
						>
							<AiOutlineArrowLeft size={"24px"} />
						</motion.button>
						<h1 className='text-xl'>
							{isGroupSidebar ? "Create group chat" : "Add user"}
						</h1>
					</div>
					{isGroupSidebar && <GroupNameInput />}
					<SearchBox />
					<SelectedUsers />
					<UserList />
					{isGroupSidebar && <CreateGroupBtn />}
				</motion.aside>
			)}
			{/* Small screens */}
			{isSidebarOpen && (
				<motion.aside
					className={`relative rounded-2xl md:hidden bg bg-white/90 dark:bg-black/90 py-16 z-20`}
					onClick={(e) => {
						e.stopPropagation()
					}}
					key={"sidebarSm"}
					initial={{ opacity: 0, height: 0, width: 0 }}
					animate={{ opacity: 1, height: "80%", width: "96%" }}
					exit={{ opacity: 0, height: 0, width: 0 }}
					transition={{ when: "afterChildren", duration: 0.15 }}
				>
					<motion.div
						className={`flex flex-col h-full items-center justify-start gap-3`}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.01 }}
					>
						<button
							type='button'
							onClick={handleClose}
							className='absolute top-5 right-5 px-2'
						>
							<RxCross2 size={"26px"} />
						</button>

						<h1 className='text-xl'>
							{isGroupSidebar ? "Create group chat" : "Add user"}
						</h1>
						{isGroupSidebar && <GroupNameInput />}
						<SearchBox />
						<SelectedUsers />
						<UserList />
						{isGroupSidebar && <CreateGroupBtn />}
					</motion.div>
				</motion.aside>
			)}
		</DimBg>
	)
}
export default Sidebar
