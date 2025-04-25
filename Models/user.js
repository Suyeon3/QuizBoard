const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    { imageUrl: String },
    { timeStamp : true}
)

const Image = mongoose.model('image', imageSchema);

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		maxlength: 50,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
	}
})

const User = mongoose.model('user', userSchema);

module.exports = User;