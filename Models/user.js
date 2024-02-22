const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    { imageUrl: String },
    { timeStamp : true}
)

const Image = mongoose.model('image', imageSchema);

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		maxlength: 50,
	},
	userId: {
		type: String,
		required: true,
		unique: true
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
	},
	gallery: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: Image
	}],
	token: {
		type: String,	
	},
    online: {
        type: Boolean,
        dafault: false
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;