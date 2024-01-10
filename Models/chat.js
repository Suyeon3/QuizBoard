const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
    {
        chat: String,
        user: {
          id: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
          },
          name: String,
        },
    },
    { timestamp: true },
)

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;