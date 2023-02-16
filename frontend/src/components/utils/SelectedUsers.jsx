import { useAppContext } from "../../context/appContext"
import { RxCross2 } from "react-icons/rx"
import { motion } from "framer-motion"
function SelectedUsers() {
	const { selectedGroupUsers, removeUserFromGroupList } = useAppContext()
	var arr = new Array()
	if (selectedGroupUsers.size !== 0) {
		arr = Array.from(selectedGroupUsers)
	}
	return (
		<div className='flex overflow-x-auto overflow-y-hidden pt-2 pb-3 px-2 w-11/12 md:w-full items-center scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-white/20 dark:scrollbar-thumb-black/20 scrollbar-track-transparent gap-2 my-2 empty:hidden text-xs'>
			{arr.map((user) => {
				user = JSON.parse(user)
				return (
					<motion.button
						className='flex items-center gap-1 cursor-pointer rounded-full px-2 py-1 bg-white dark:bg-black hover:bg-red-400 hover:dark:bg-red-500'
						key={user._id}
						whileHover={{ scale: 1.05 }}
						onClick={() => {
							removeUserFromGroupList(user)
						}}
					>
						<span>{user.name}</span>
						<RxCross2 size={"16px"} />
					</motion.button>
				)
			})}
		</div>
	)
}
export default SelectedUsers
