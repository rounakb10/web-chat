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
	REMOVE_USER,
	FETCH_CHATS_BEGIN,
	FETCH_CHATS_SUCCESS,
	FETCH_USERS_BEGIN,
	FETCH_USERS_SUCCESS,
	FETCH_USERS_ERROR,
	CREATE_CHAT_BEGIN,
	CREATE_CHAT_SUCCESS,
	RENAME_GROUP_BEGIN,
	RENAME_GROUP_SUCCESS,
	ADD_MESSAGE,
} from "./actions"

import { initialState } from "./appContext"

const reducer = (state, action) => {
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: action.payload.type,
			alertText: action.payload.text,
		}
	} else if (action.type === CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertText: "",
			alertType: "",
		}
	} else if (action.type === UPLOAD_PIC_BEGIN) {
		return {
			...state,
			isPicLoading: true,
		}
	} else if (action.type === UPLOAD_PIC_SUCCESS) {
		return {
			...state,
			isPicLoading: false,
		}
	} else if (action.type === SETUP_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	} else if (action.type === SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			token: action.payload.token,
			showAlert: true,
			alertType: "success",
			alertText: action.payload.alertText,
		}
	} else if (action.type === SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		}
	} else if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
		}
	} else if (action.type === UPDATE_USER_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	} else if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			user: action.payload.user,
			token: action.payload.token,
			showAlert: true,
			alertType: "success",
			alertText: "User Profile Updated!",
		}
	} else if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		}
	} else if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			isSidebarOpen: !state.isSidebarOpen,
		}
	} else if (action.type === GROUP_SIDEBAR) {
		return {
			...state,
			isGroupSidebar: !state.isGroupSidebar,
		}
	} else if (action.type === CLEAR_SIDEBAR) {
		return {
			...state,
			search: "",
			searchUsers: [],
			groupName: "",
			selectedGroupUsers: new Set(),
		}
	} else if (action.type === TOGGLE_PROFILE_MODAL) {
		return {
			...state,
			isProfileModalOpen: !state.isProfileModalOpen,
		}
	} else if (action.type === TOGGLE_GROUP_MODAL) {
		return {
			...state,
			isGroupModalOpen: !state.isGroupModalOpen,
		}
	} else if (action.type === TOGGLE_CHAT) {
		if (state.isChatOpen) {
			return {
				...state,
				isChatOpen: !state.isChatOpen,
				messages: [],
				currentChat: {},
				lastMessageId: "",
			}
		}
		return {
			...state,
			isChatOpen: !state.isChatOpen,
		}
	} else if (action.type === TOGGLE_ACTION_BUTTON) {
		return {
			...state,
			isActionButtonOpen: !state.isActionButtonOpen,
		}
	} else if (action.type === HANDLE_CHANGE) {
		return {
			...state,
			[action.payload.name]: [action.payload.value].toString(),
		}
	} else if (action.type === ADD_USER) {
		return {
			...state,
			// selectedGroupUsers: [...state.selectedGroupUsers, action.payload],
			selectedGroupUsers: state.selectedGroupUsers.add(
				JSON.stringify(action.payload)
			),
		}
	} else if (action.type === REMOVE_USER) {
		state.selectedGroupUsers.delete(JSON.stringify(action.payload))
		return {
			...state,
			// selectedGroupUsers: [...state.selectedGroupUsers, action.payload],
		}
	} else if (action.type === FETCH_CHATS_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		}
	} else if (action.type === FETCH_CHATS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			chats: action.payload,
		}
	} else if (action.type === FETCH_USERS_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		}
	} else if (action.type === FETCH_USERS_SUCCESS) {
		return {
			...state,
			isLoading: false,
			searchUsers: action.payload,
		}
	} else if (action.type === FETCH_USERS_ERROR) {
		return {
			...state,
			isLoading: false,
			searchUsers: [],
		}
	} else if (action.type === CREATE_CHAT_BEGIN) {
		return {
			...state,
			isLoading: true,
			showAlert: false,
		}
	} else if (action.type === CREATE_CHAT_SUCCESS) {
		return {
			...state,
			isLoading: false,
			currentChat: action.payload.chat,
			messages: action.payload.messages,
		}
	} else if (action.type === RENAME_GROUP_BEGIN) {
		return {
			...state,
			isLoading: true,
		}
	} else if (action.type === RENAME_GROUP_SUCCESS) {
		return {
			...state,
			isLoading: false,
			currentChat: action.payload,
		}
	} else if (action.type === ADD_MESSAGE) {
		if (state.lastMessageId === action.payload._id) return { ...state }
		if (state.currentChat._id !== action.payload.chat._id)
			return { ...state }
		return {
			...state,
			messages: [action.payload, ...state.messages],
			lastMessageId: action.payload._id,
		}
	}
	throw new Error(`no such action :  ${action.type}`)
}

export default reducer
