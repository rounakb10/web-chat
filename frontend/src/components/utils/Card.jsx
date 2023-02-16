function Card({ children, className }) {
	return (
		<div
			className={`py-4 rounded-xl shadow-lg ${className} bg-white/40 dark:bg-black/50`}
		>
			{children}
		</div>
	)
}
export default Card
