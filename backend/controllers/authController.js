const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors/index.js")

var ImageKit = require("imagekit")
var imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: "https://ik.imagekit.io/yqjkcggya",
})

const uploadImage = async (req, res) => {
	const { file } = req

	if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
		imagekit
			.upload({
				file: file.buffer, //required
				fileName: file.originalname, //required
			})
			.then((response) => {
				res.status(StatusCodes.OK).json({ url: response.url })
			})
			.catch((error) => {
				res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					err: error,
				})
			})
	} else {
		res.status(StatusCodes.BAD_REQUEST).json({ err: "Wrong file type" })
	}
}

const register = async (req, res) => {
	const { name, email, password, pic } = req.body
	if (!name || !email || !password) {
		throw new BadRequestError("Please provide all values")
	}

	const userAlreadyExists = await User.findOne({ email })
	if (userAlreadyExists) {
		throw new BadRequestError("Email already in use")
	}

	const user = await User.create({ name, email, password, pic })

	const token = user.createJWT()

	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			name: user.name,
			_id: user._id,
			pic: user.pic,
		},
		token,
	})
}

const login = async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		throw new BadRequestError("Please provide all values")
	}
	const user = await User.findOne({ email }).select("+password")
	if (!user) {
		throw new UnauthenticatedError("Invalid email address")
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid password")
	}
	const token = user.createJWT()

	user.password = undefined
	res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
	const { name, email, pic } = req.body
	if (!email || !name) {
		throw new BadRequestError("Please provide all values")
	}
	const user = await User.findOne({ _id: req.user.userId })

	if (user.email !== email) {
		const tempUser = await User.findOne({ email: email })
		if (tempUser) {
			throw new BadRequestError("Email already exists")
		}
	}

	user.email = email
	user.name = name
	if (pic) {
		user.pic = pic
	}

	await user.save()

	const token = user.createJWT()
	res.status(StatusCodes.OK).json({ user, token })
}

const getUsers = async (req, res) => {
	if (req.query.search === "") {
		throw BadRequestError("Missing search params")
	}
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: {}

	const users = await User.find(keyword).find({
		_id: { $ne: req.user.userId },
	})

	res.status(StatusCodes.OK).json(users)
}

module.exports = { register, login, updateUser, uploadImage, getUsers }
