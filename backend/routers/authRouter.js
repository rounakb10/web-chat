const router = require("express").Router()

// import rateLimit from "express-rate-limit"

// const apiLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	message: "Too many requests from this IP. Try again in 15 minutes...",
// })

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
