const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);

	// a) Mongoose validation
	// b) Joi
	// c) check in the controller

	if (!username || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	// Normally id provided by DB
	const id = new Date().getDate();

	// try to keep payload small, better experience for user
	// JWT_SECRET: Always use long, complex and unguessable string value in production!
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	res.status(200).json({ msg: 'user created', token });

	res.send('Mock Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
	const randomNumber = Math.floor(Math.random() * 100);

	res.status(200).json({
		msg: `Hello ${req.user.username}`,
		secret: `Here is your authorized data, your random number is ${randomNumber}`,
	});
};

module.exports = {
	login,
	dashboard,
};
