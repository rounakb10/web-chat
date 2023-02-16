import { createContext, useContext, useReducer, useState } from "react"
import reducer from "./reducer"
import axios from "axios"

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	SETUP_USER_BEGIN,
	SETUP_USER_SUCCESS,
	SETUP_USER_ERROR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	UPLOAD_PIC_BEGIN,
	UPLOAD_PIC_SUCCESS,
	TOGGLE_SIDEBAR,
	GROUP_SIDEBAR,
	CLEAR_SIDEBAR,
	TOGGLE_PROFILE_MODAL,
	TOGGLE_GROUP_MODAL,
	TOGGLE_CHAT,
	TOGGLE_ACTION_BUTTON,
	HANDLE_CHANGE,
	ADD_USER,
	FETCH_CHATS_BEGIN,
	FETCH_CHATS_SUCCESS,
	FETCH_USERS_BEGIN,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	CREATE_CHAT_BEGIN,
	CREATE_CHAT_SUCCESS,
	REMOVE_USER,
	ADD_MESSAGE,
	RENAME_GROUP_BEGIN,
	RENAME_GROUP_SUCCESS,
} from "./actions"

import io from "socket.io-client"
const ENDPOINT = "http://localhost:5000"
var socket = io(ENDPOINT)

const token = localStorage.getItem("token")
const user = localStorage.getItem("user")

const initialState = {
	isLoading: false,
	isPicLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
	isSidebarOpen: false,
	isGroupSidebar: false,
	isProfileModalOpen: false,
	isGroupModalOpen: false,
	isChatOpen: false,
	isActionButtonOpen: false,
	chats: [],
	//search
	search: "",
	searchUsers: [],
	groupName: "",
	selectedGroupUsers: new Set(),
	//chat
	currentChat: {},
	messages: [],
	lastMessageId: "",
}
const AppContext = createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const [socketConnected, setSocketConnected] = useState(false)
	const authFetch = axios.create({
		baseURL: "/api",
	})

	authFetch.interceptors.request.use(
		(config) => {
			config.headers.Authorization = `Bearer ${state.token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			// console.log(error.response)
			if (error.response.status === 401) {
				logoutUser()
			}
			return Promise.reject(error)
		}
	)

	const displayAlert = ({ type, text }) => {
		dispatch({ type: DISPLAY_ALERT, payload: { type, text } })
		clearAlert()
	}

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 5000)
	}

	const setPicLoading = () => {
		dispatch({ type: UPLOAD_PIC_BEGIN })
	}

	const setPicLoaded = () => {
		dispatch({ type: UPLOAD_PIC_SUCCESS })
	}

	const addUserToLocalStorage = ({ user, token, pic }) => {
		localStorage.setItem("user", JSON.stringify(user))
		localStorage.setItem("token", token)
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
	}

	const uploadImage = async ({ file, setValues, values }) => {
		dispatch({ type: UPLOAD_PIC_BEGIN })
		console.log(file)
		var bodyFormData = new FormData()
		bodyFormData.append("image", file)

		// const response = axios({
		// 	method: "post",
		// 	url: "/api/auth/upload_image",
		// 	data: bodyFormData,
		// 	headers: { "Content-Type": "multipart/form-data" },
		// })
		axios
			.post("/api/auth/upload_image", bodyFormData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				setValues({ ...values, pic: response.data.url })
				dispatch({ type: UPLOAD_PIC_SUCCESS })
				// return response.url
			})
			.catch((error) => {
				console.log(error)
				dispatch({ type: UPLOAD_PIC_SUCCESS })
			})
	}

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: SETUP_USER_BEGIN })
		try {
			const response = await axios.post(
				`/api/auth/${endPoint}`,
				currentUser
			)
			const { user, token } = response.data
			dispatch({
				type: SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			})
			addUserToLocalStorage({ user, token })
		} catch (err) {
			dispatch({
				type: SETUP_USER_ERROR,
				payload: { msg: err.response.data.msg },
			})
		}
		clearAlert()
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage({ user, token })
	}

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		try {
			const response = await authFetch.patch(
				"/auth/updateUser",
				currentUser
			)
			const { user, location, pic } = response.data
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, token },
			})
			addUserToLocalStorage({ user, token })
		} catch (err) {
			if (err.response.status !== 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: err.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	const fetchUsers = async () => {
		const { search } = state
		if (!search) {
			dispatch({ type: FETCH_USERS_ERROR })
			return
		}
		dispatch({ type: FETCH_USERS_BEGIN })
		let url = `/auth?search=${search}`
		try {
			const { data } = await authFetch.get(url)
			dispatch({ type: FETCH_USERS_SUCCESS, payload: data })
		} catch (e) {
			dispatch({ type: FETCH_USERS_ERROR })
		}
	}

	const fetchChats = async () => {
		dispatch({ type: FETCH_CHATS_BEGIN })
		const { data } = await authFetch.get("/chat")
		dispatch({ type: FETCH_CHATS_SUCCESS, payload: data })
	}

	const createChat = async (user) => {
		dispatch({ type: CREATE_CHAT_BEGIN })
		const { data } = await authFetch.post("/chat", { userId: user._id })
		toggleChat({ chat: data })
	}

	const createGroupChat = async () => {
		dispatch({ type: CREATE_CHAT_BEGIN })
		let arr = Array.from(state.selectedGroupUsers)
		arr.map((user, index) => {
			arr[index] = JSON.parse(user)._id
		})

		const { data } = await authFetch.post("/chat/group", {
			name: state.groupName,
			users: JSON.stringify(arr),
		})
		toggleChat({ chat: data })
	}

	const renameGroupChat = async ({ groupName }) => {
		dispatch({ type: RENAME_GROUP_BEGIN })
		const { data } = await authFetch.put("/chat/rename_group", {
			chatId: state.currentChat._id,
			chatName: groupName,
		})
		dispatch({ type: RENAME_GROUP_SUCCESS, payload: data })
		fetchChats()
	}

	const sendMessage = async ({ content, chatId }) => {
		const { data: message } = await authFetch.post("/message", {
			content,
			chatId,
		})
		addMessage({ message })
		socket.emit("new message", message)
		fetchChats()
	}

	const addMessage = async ({ message }) => {
		dispatch({ type: ADD_MESSAGE, payload: message })
	}

	const addUserToGroupList = (user) => {
		// selectedGroupUsers
		dispatch({ type: ADD_USER, payload: user })
	}

	const removeUserFromGroupList = (user) => {
		dispatch({ type: REMOVE_USER, payload: user })
	}

	const openChat = async ({ chat }) => {
		const { data } = await authFetch.get(`/message/${chat._id}`)
		dispatch({
			type: CREATE_CHAT_SUCCESS,
			payload: { chat, messages: data },
		})
	}

	const toggleChat = ({ chat }) => {
		if (chat) {
			openChat({ chat })
		}
		dispatch({ type: TOGGLE_CHAT })
	}

	const toggleSidebar = () => {
		dispatch({ type: TOGGLE_SIDEBAR })
		clearSidebar()
	}

	const toggleGroupSidebar = () => {
		toggleSidebar()
		dispatch({ type: GROUP_SIDEBAR })
	}

	const clearSidebar = () => {
		dispatch({ type: CLEAR_SIDEBAR })
	}

	const toggleProfileModal = () => {
		dispatch({ type: TOGGLE_PROFILE_MODAL })
	}

	const toggleGroupModal = () => {
		dispatch({ type: TOGGLE_GROUP_MODAL })
	}

	const toggleActionButton = () => {
		dispatch({ type: TOGGLE_ACTION_BUTTON })
	}

	const handleChange = ({ name, value }) => {
		dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				clearAlert,
				setupUser,
				logoutUser,
				updateUser,
				setPicLoading,
				setPicLoaded,
				uploadImage,
				toggleSidebar,
				toggleGroupSidebar,
				clearSidebar,
				toggleProfileModal,
				toggleGroupModal,
				toggleChat,
				toggleActionButton,
				handleChange,
				addUserToGroupList,
				removeUserFromGroupList,
				fetchUsers,
				fetchChats,
				createChat,
				createGroupChat,
				renameGroupChat,
				openChat,
				sendMessage,
				addMessage,
				socketConnected,
				setSocketConnected,
				socket,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }
