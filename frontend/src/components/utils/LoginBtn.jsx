function LoginBtn({ name, disabled }) {
	return (
		<button
			type='submit'
			disabled={disabled}
			className='w-[99%] bg-indigo-400/70 dark:bg-indigo-300/80  hover:bg-indigo-400 hover:dark:bg-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed text-buttontext p-3 mt-4 rounded-lg self-center capitalize default-transition'
		>
			{name}
		</button>
	)
}
export default LoginBtn
