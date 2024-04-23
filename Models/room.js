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
    registeredMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    allMembers: [String],
    status: {
        type: Boolean,
        default: false,
    }
})

roomSchema.set('timestamps', true);

const Room = mongoose.model('room', roomSchema);

module.exports = Room;