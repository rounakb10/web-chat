import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAppContext } from "../../context/appContext"
// import GroupNameInput from "../utils/GroupNameInput"
import Modal from "../utils/Modal"
import { isEmpty } from "lodash"
function EditGroupModal() {
	const { currentChat, isGroupModalOpen, toggleGroupModal, renameGroupChat } =
		useAppContext()
	const [groupName, setGroupName] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			currentChat.chatName === groupName.trim() ||
			groupName.trim() === ""
		)
			return

		renameGroupChat({ groupName })
	}

	useEffect(() => {
		if (isEmpty(currentChat)) return
		setGroupName(currentChat.chatName.toString())
	}, [currentChat])

	return (
		<Modal isModalOpen={isGroupModalOpen} toggleModal={toggleGroupModal}>
			<h1 className='text-xl'>Edit Group Chat</h1>
			<form
				className='flex gap-3 md:gap-2 flex-col items-center md:flex-row'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					className=' px-3 py-2 rounded-xl bg-white/20 dark:bg-black/20 border-[1px] border-neutral-400 dark:border-neutral-400/10 placeholder:text-neutral-400/40 placeholder:dark:text-neutral-200/20 focus:outline-none'
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
				/>
				<motion.button
					type='submit'
					className='mt-auto w-auto bg-emerald-400 dark:bg-emerald-500 dark:text-black disabled:bg-neutral-300 disabled:dark:bg-neutral-700 disabled:cursor-not-allowed rounded-full py-1 md:py-2 px-3 md:px-4'
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 1.02 }}
					disabled={
						currentChat.chatName === groupName.trim() ||
						groupName.trim() === ""
					}
				>
					Rename
				</motion.button>
			</form>
			{currentChat.users &&
				currentChat.users.map((user) => (
					<p key={user._id}>{user.email}</p>
				))}
		</Modal>
	)
}
export default EditGroupModal
