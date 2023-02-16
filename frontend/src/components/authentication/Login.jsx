// import { useEffect, useState } from "react"
// import { useAppContext } from "../../context/appContext"
// import FormRow from "../FormRow"
// import LoginBtn from "../LoginBtn"
// import Toast from "../Toast"
// import { useNavigate } from "react-router-dom"

// const initialState = {
// 	email: "",
// 	password: "",
// }

// function Login() {
// 	const { user } = useAppContext()
// 	const navigate = useNavigate()
// 	useEffect(() => {
// 		if (user) {
// 			setTimeout(() => {
// 				navigate("/")
// 			}, 500)
// 		}
// 	}, [user, navigate])

// 	const [values, setValues] = useState(initialState)

// 	const { isLoading, showAlert, displayAlert, setupUser } = useAppContext()

// 	const handleChange = (e) => {
// 		setValues({ ...values, [e.target.name]: e.target.value })
// 	}

// 	const handleSubmit = (e) => {
// 		e.preventDefault()
// 		const { email, password } = values
// 		if (!email || !password) {
// 			displayAlert({ type: "danger", text: "Please provide all values" })
// 			return
// 		}

// 		var currentUser = { email, password }

// 		setupUser({
// 			currentUser,
// 			endPoint: "login",
// 			alertText: "Login successful",
// 		})
// 	}

// 	return (
// 		<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
// 			{showAlert && <Toast />}
// 			<FormRow
// 				labelText='email address'
// 				name='email'
// 				type='email'
// 				value={values.email}
// 				handleChange={handleChange}
// 			/>
// 			<FormRow
// 				name='password'
// 				type='password'
// 				value={values.password}
// 				handleChange={handleChange}
// 			/>
// 			<LoginBtn name='login' disabled={isLoading} />
// 			<button
// 				type='button'
// 				onClick={() => {
// 					setValues({
// 						...values,
// 						email: "test@test.com",
// 						password: "123456",
// 					})
// 				}}
// 			>
// 				get test credentials
// 			</button>
// 		</form>
// 	)
// }
// export default Login
