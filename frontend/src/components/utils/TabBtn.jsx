function TabBtn({ isLogin, setIsLogin, text }) {
	return (
		<button
			className={`quick-transition w-1/2 rounded-full py-2 capitalize ${
				(isLogin && text === "login") ||
				(!isLogin && text === "register")
					? "bg-indigo-400/70 dark:bg-indigo-300/80 text-buttontext"
					: "hover:bg-indigo-400/20 hover:dark:bg-indigo-300/10"
			}`}
			onClick={() => {
				text === "login" ? setIsLogin(true) : setIsLogin(false)
			}}
		>
			{text}
		</button>
	)
}
export default TabBtn
