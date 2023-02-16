const router = require("express").Router()
const {
	fetchChats,
	createChat,
	createGroupChat,
	renameGroupChat,
	addToGroupChat,
	removeFromGroupChat,
} = require("../controllers/chatController")

// const authenticateUser = require("../middleware/auth.js")

router.route("/").post(createChat).get(fetchChats)
router.route("/group").post(createGroupChat)
router.route("/rename_group").put(renameGroupChat)
router.route("/add_to_group").put(addToGroupChat)
router.route("/remove_from_group").put(removeFromGroupChat)

module.exports = router
