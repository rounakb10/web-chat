import { useAppContext } from "../../context/appContext"

function GroupNameInput() {
	const { groupName, handleChange } = useAppContext()

	const handleGroupName = (e) => {
		handleChange({ name: e.target.name, value: e.target.value })
	}
	return (
		<input
			type='text'
			name='groupName'
			value={groupName}
			autoComplete='off'
			placeholder='Enter group name'
			onChange={handleGroupName}
			className='px-3 py-2 rounded-xl bg-white/20 dark:bg-black/20 border-[1px] border-neutral-400 dark:border-neutral-400/10 placeholder:text-neutral-400/40 placeholder:dark:text-neutral-200/20 focus:outline-none'
		/>
	)
}
export default GroupNameInput
