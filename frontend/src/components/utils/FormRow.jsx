import { useAppContext } from "../../context/appContext"
import { PulseLoader } from "react-spinners"
function FormRow({
	labelText,
	name,
	type,
	value,
	handleChange,
	className,
	showLabel = true,
	placeholder,
}) {
	const { isPicLoading } = useAppContext()

	return (
		<div className={`flex flex-col gap-2 capitalize px-1 ${className}`}>
			{showLabel && (
				<label
					htmlFor={type}
					className='font-medium flex items-center gap-2'
				>
					{labelText || name}
					{isPicLoading && type === "file" && (
						<PulseLoader size='8px' color='var(--grey)' />
					)}
				</label>
			)}
			<input
				type={type}
				accept='.png, .jpg'
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={
					placeholder ||
					`Enter ${
						name === "confirmPassword"
							? "password again"
							: labelText || name
					}`
				}
				className='px-3 py-2 bg-indigo-100/20 autofill:bg-indigo-100/20 dark:bg-indigo-300/10 rounded-lg border-2 border-black/10 dark:border-white/10 placeholder:text-indigo-300/50 placeholder:dark:text-indigo-200/20 file:bg-bg file:text-text file:rounded-md file:shadow-sm file:border-none file:px-2 file:py-1 file:mr-3 file:cursor-pointer'
			/>
		</div>
	)
}
export default FormRow
