import { useState } from "react"
import { useAppContext } from "../../context/appContext"

function Messages({ isGC }) {
	const { messages, user } = useAppContext()
	const [readMore, setReadMore] = useState(false)
	return (
		<div className='flex flex-col-reverse gap-2 basis-full px-2 md:pr-4 overflow-y-scroll md:scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-white dark:scrollbar-thumb-black/30 scrollbar-track-transparent'>
			{messages.map((msg, index) => {
				return (
					<div
						key={msg._id}
						className={`p-2 ${index === 0 && "mb-2"} ${
							index === messages.length - 1 && "mt-2"
						} max-w-[80%] bg-white/50 dark:bg-black/50 ${
							msg.sender._id === user._id
								? "self-end rounded-tr-none"
								: "self-start"
						} rounded-xl select-text ${
							isGC &&
							((index + 1 < messages.length &&
								messages[index + 1].sender._id !==
									messages[index].sender._id &&
								msg.sender._id !== user._id) ||
								(index === messages.length - 1 &&
									msg.sender._id !== user._id)) &&
							"flex flex-col rounded-tl-none"
						}`}
					>
						{isGC &&
							((index + 1 < messages.length &&
								messages[index + 1].sender._id !==
									messages[index].sender._id &&
								msg.sender._id !== user._id) ||
								(index === messages.length - 1 &&
									msg.sender._id !== user._id)) && (
								<p className='text-indigo-500 dark:text-indigo-300 text-sm'>
									{msg.sender.name}
								</p>
							)}

						<p>
							{!readMore
								? msg.content.toString().substring(0, 400)
								: msg.content}
							{msg.content.toString().length > 400 && (
								<>
									{!readMore ? "... " : " "}
									<a
										className='text-blue-500 cursor-pointer'
										onClick={() =>
											setReadMore((prev) => {
												return !prev
											})
										}
									>
										{readMore ? "read less" : "read more"}
									</a>
								</>
							)}
						</p>
					</div>
				)
			})}
		</div>
	)
}
export default Messages
