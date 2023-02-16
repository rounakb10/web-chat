import { useAppContext } from "../context/appContext"
import UserListItem from "./utils/UserListItem"

function UserList() {
	const { searchUsers, selectedGroupUsers, isGroupSidebar } = useAppContext()

	return (
		<div
			className={`flex flex-col p-2 md:p-3 rounded-2xl bg-white/20 dark:bg-black/20 overflow-y-scroll overflow-x-hidden md:scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-white/20 dark:scrollbar-thumb-black/20 scrollbar-track-transparent gap-3 w-11/12 md:w-full empty:hidden`}
		>
			{isGroupSidebar
				? searchUsers.map((user) => {
						if (!selectedGroupUsers.has(JSON.stringify(user))) {
							return <UserListItem key={user._id} user={user} />
						}
				  })
				: searchUsers.map((user) => {
						return <UserListItem key={user._id} user={user} />
				  })}
		</div>
	)
}
export default UserList
