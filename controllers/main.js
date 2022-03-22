const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);

	// a) Mongoose validation
	// b) Joi
	// c) check in the controller

	if (!username || !password) {
		throw new CustomAPIError('Please provide email and password', 400);
	}

	// Normally id provided by DB
	// JWT_SECRET: Always use long, complex and unguessable string value in production!
	const id = new Date().getDate();

	// try to keep payload small, better experience for user
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({ msg: 'user created', token });

	res.send('Mock Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
	const randomNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: 'Hello',
		secret: `Here is your authorized data, your random number is ${randomNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
};
