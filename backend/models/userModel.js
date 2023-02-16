const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide name"],
			minLength: 3,
			maxLength: 20,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide email"],
			validate: {
				validator: validator.isEmail,
				message: "Please provide a valid email address",
			},
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
			select: false,
		},
		pic: {
			type: String,
			default:
				"https://ik.imagekit.io/yqjkcggya/anonymous-avatar-icon-25.jpg",
		},
	},
	{ timestamps: true }
)

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
}

userSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password)
	return isMatch
}

const User = mongoose.model("User", userSchema)

module.exports = User
