import { Link } from "react-router-dom"
import img from "../assets/error.svg"
function NotFoundPage() {
	return (
		<div className='flex flex-col items-center justify-center h-screen gap-2'>
			<img
				src={img}
				alt='Not Found'
				className='w-1/2 md:w-1/3 2xl:w-1/4 m-4'
			/>
			<h3 className='text-2xl text-center'>Oops! Page Not Found</h3>
			<p className='text-xl text-center'>
				We can't seem to find the page you're looking for
			</p>
			<Link
				to='/'
				className='text-neutral-700 dark:text-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-300'
			>
				Back Home
			</Link>
		</div>
	)
}
export default NotFoundPage
