const mongoose = require('mongoose');
const User = require('./user');

const chatSchema = new mongoose.Schema({
    chat: {
        type: String,
        required: true
    },
    user: {
        _id: {
            type: mongoose.Schema.ObjectId,
            ref: User
        },
        name: {
            type: String,
            required: true
        }
    }
});

chatSchema.set('timestamps', true);

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;