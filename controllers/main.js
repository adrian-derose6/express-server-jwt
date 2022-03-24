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
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new CustomAPIError('No token provided', 401);
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const randomNumber = Math.floor(Math.random() * 100);

		res.status(200).json({
			msg: `Hello ${decoded.username}`,
			secret: `Here is your authorized data, your random number is ${randomNumber}`,
		});
	} catch (error) {
		throw new CustomAPIError('Not authorized to access this route', 401);
	}
};

module.exports = {
	login,
	dashboard,
};
