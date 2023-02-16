const router = require("express").Router()
const {
	sendMessage,
	allMessages,
} = require("../controllers/messageController.js")

// const authenticateUser = require("../middleware/auth.js")

router.route("/").post(sendMessage)
router.route("/:chatId").get(allMessages)

module.exports = router
