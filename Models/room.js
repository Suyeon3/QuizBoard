const mongoose = require('mongoose');
const User = require('./user');

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        maxlength: 50,
        required: true,
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    status: {
        type: Boolean,
        default: true,
    }
})

roomSchema.set('timestamps', true);

const Room = mongoose.model('room', roomSchema);

module.exports = Room;