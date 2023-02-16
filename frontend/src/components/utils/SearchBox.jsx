import { useAppContext } from "../../context/appContext"
import { DebounceInput } from "react-debounce-input"
import { useEffect } from "react"

function SearchBox() {
	const { search, handleChange, fetchUsers } = useAppContext()
	const handleSearch = (e) => {
		handleChange({ name: e.target.name, value: e.target.value })
	}
	useEffect(() => {
		fetchUsers()
	}, [search])
	return (
		<DebounceInput
			debounceTimeout={300}
			type='text'
			name='search'
			autoComplete='off'
			value={search}
			onChange={handleSearch}
			placeholder='Search user'
			className=' px-3 py-2 rounded-xl bg-white/20 dark:bg-black/20 border-[1px] border-neutral-400 dark:border-neutral-400/10 placeholder:text-neutral-400/40 placeholder:dark:text-neutral-200/20 focus:outline-none'
		/>
	)
}
export default SearchBox
