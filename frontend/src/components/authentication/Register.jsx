import { useEffect, useState } from "react"
import FormRow from "../utils/FormRow"
import LoginBtn from "../utils/LoginBtn"
import { useAppContext } from "../../context/appContext"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	pic: "",
	// isLogin: true,
}

function Register({ isLogin }) {
	const { user } = useAppContext()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [user, navigate])
	const [values, setValues] = useState(initialState)

	const { isLoading, displayAlert, setupUser, isPicLoading, uploadImage } =
		useAppContext()

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const handleFile = (e) => {
		if (e.target.value === "") {
			setValues({ ...values, pic: "" })
			return
		}
		uploadImage({ file: e.target.files[0], setValues, values })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		var currentUser
		if (isLogin) {
			const { email, password } = values
			if (!email || !password) {
				displayAlert({
					type: "danger",
					text: "Please provide all values",
				})
				return
			}

			currentUser = { email, password }

			setupUser({
				currentUser,
				endPoint: "login",
				alertText: "Login successful",
			})

			return
		}

		const { name, email, password, confirmPassword, pic } = values
		if (!email || !password) {
			displayAlert({ type: "danger", text: "Please provide all values" })
			return
		}

		if (password.length < 6) {
			displayAlert({
				type: "danger",
				text: "Password must be >= 6 characters",
			})
			return
		}

		if (password !== confirmPassword) {
			displayAlert({ type: "danger", text: "Passwords do not match" })
			return
		}

		currentUser = { name, email, password }

		if (pic !== "") currentUser = { name, email, password, pic }

		setupUser({
			currentUser,
			endPoint: "register",
			alertText: "Registration successful",
		})
	}

	return (
		<motion.form
			className={`flex flex-col md:overflow-hidden gap-4 4xl:gap-8 transition-[height] ${
				isLogin
					? "h-[15.5rem] md:h-[15.5rem] 3xl:h-[15.5rem]"
					: "h-[33rem] md:h-[27.5rem] 3xl:h-[33rem]"
			}`}
			onSubmit={handleSubmit}
		>
			<FormRow
				name='name'
				type='text'
				value={values.name}
				handleChange={handleChange}
				isLogin={isLogin}
				className={`${isLogin && "hidden"}`}
			/>

			<FormRow
				labelText='email'
				name='email'
				type='email'
				value={values.email}
				handleChange={handleChange}
			/>
			<div className='flex flex-col md:flex-row 3xl:flex 3xl:flex-col gap-4 4xl:gap-8'>
				<div className='md:flex-grow'>
					<FormRow
						name='password'
						type='password'
						value={values.password}
						handleChange={handleChange}
					/>
				</div>
				<div className={`md:flex-grow ${isLogin && "hidden"}`}>
					<FormRow
						labelText='confirm password'
						name='confirmPassword'
						type='password'
						value={values.confirmPassword}
						handleChange={handleChange}
					/>
				</div>
			</div>
			<FormRow
				labelText='profile picture'
				name='profilePicture'
				type='file'
				value={values.profilePicture}
				handleChange={handleFile}
				className={`${isLogin && "hidden"}`}
			/>

			<LoginBtn
				name={`${isLogin ? "login" : "register"}`}
				disabled={isLoading || isPicLoading}
			/>
		</motion.form>
	)
}
export default Register
