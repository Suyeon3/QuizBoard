const User = require('../Models/user');

module.exports = function(io) {
    //io~~
    io.on('connection', async(socket) => {
        console.log('client is connected', socket.id);

        socket.on('login', async(userId, cb) => {
            try {
                const user = await User.findOne({userId});
                user.sid = socket.id;
                console.log(user.sid)
                cb({ok: true, data: user});
            } catch(error) {
                cb({ok: false, error: error.message})
            }
            
        })

        socket.on('disconnect', () => {
            console.log('user is disconnected')
        })
    }) 


};  