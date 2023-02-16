import { useState } from "react"
// import Login from "../components/authentication/Login"
import Register from "../components/authentication/Register"
import { Toggle } from "react-hook-theme"
import "react-hook-theme/dist/styles/style.css"
import Card from "../components/utils/Card"
import { useAppContext } from "../context/appContext"
import Toast from "../components/utils/Toast"
import TabBtn from "../components/utils/TabBtn"

function HomePage() {
	const [isLogin, setIsLogin] = useState(true)
	const { showAlert } = useAppContext()
	return (
		<div className='flex min-h-screen justify-center 4xl:text-2xl'>
			<div className='max-w-3xl 4xl:max-w-screen-2xl w-11/12 md:w-9/12 items-stretch flex flex-col justify-center gap-4'>
				<div className='absolute top-4 right-3'>
					<Toggle />
				</div>

				{showAlert ? (
					<Toast />
				) : (
					<Card>
						<h1 className='text-4xl 4xl:text-6xl text-center select-none'>
							Chatly
						</h1>
					</Card>
				)}

				<Card className='px-4'>
					<div className='flex gap-6 mb-6 '>
						<TabBtn
							isLogin={isLogin}
							setIsLogin={setIsLogin}
							text='login'
						/>
						<TabBtn
							isLogin={isLogin}
							setIsLogin={setIsLogin}
							text='register'
						/>
					</div>
					<Register isLogin={isLogin} />
				</Card>
			</div>
		</div>
	)
}
export default HomePage
