const login = async (req, res) => {
	res.send('Mock Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
	const randomNumber = Math.floor(Math.random() * 100);
	res
		.status(200)
		.json({
			msg: 'Hello',
			secret: `Here is your authorized data, your random number is ${randomNumber}`,
		});
};

module.exports = {
	login,
	dashboard,
};
