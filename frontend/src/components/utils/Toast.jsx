import { useAppContext } from "../../context/appContext"
function Toast() {
	const { alertText, alertType } = useAppContext()
	return (
		<div
			className={`py-6 text-buttontext rounded-xl text-center ${
				alertType === "danger"
					? "bg-red-400/90 dark:bg-red-500/90"
					: "bg-emerald-400/90 dark:bg-emerald-500/90"
			}`}
		>
			<p>{alertText}</p>
		</div>
	)
}
export default Toast
