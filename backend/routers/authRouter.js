const router = require("express").Router()

const rateLimit = require("express-rate-limit")

const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 20,
	message: "Too many requests from this IP. Try again in 15 minutes...",
})

const {
	register,
	login,
	updateUser,
	uploadImage,
	getUsers,
} = require("../controllers/authController.js")

const authenticateUser = require("../middleware/auth.js")

var multer = require("multer")
var upload = multer()

router.route("/upload_image").post(upload.single("image"), uploadImage)
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/update_user").patch(authenticateUser, updateUser)
router.route("/").get(authenticateUser, getUsers)
module.exports = router
