const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
    { imageUrl: String },
    { timeStamp : true}
)

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	gallery: {
		images: [imageSchema]
	},
    online: {
        type: Boolean,
        dafault: false
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;