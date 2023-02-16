import { useAppContext } from "../context/appContext"
import { RxCross2 } from "react-icons/rx"
import { Toggle } from "react-hook-theme"
import Modal from "./utils/Modal"

function ProfileModal() {
	const { isProfileModalOpen, toggleProfileModal, user, logoutUser } =
		useAppContext()
	return (
		<Modal
			isModalOpen={isProfileModalOpen}
			toggleModal={toggleProfileModal}
		>
			<button
				type='button'
				onClick={toggleProfileModal}
				className='absolute top-5 right-5 px-2'
			>
				<RxCross2 size={"26px"} />
			</button>
			<div className='flex flex-col gap-2 items-center'>
				<img
					src={user.pic}
					alt='profile'
					className='rounded-full w-28 h-28'
				/>
				<h1>{user.name}</h1>
				<p>{user.email}</p>
			</div>

			<Toggle />
			<button
				type='button'
				className='bg-rose-500 dark:bg-rose-600 rounded-xl capitalize px-4 py-2 text-lg'
				onClick={logoutUser}
			>
				logout
			</button>
		</Modal>
	)
}
export default ProfileModal
