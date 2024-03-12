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

        socket.on('enterRoom', async(msg, done) => {
            try {
                console.log(msg);
                //Todo: db에서 입장가능한 방 찾기
                // socket.join(방금 찾은 방)
                done();
            } catch(error) {
                cb()
            }
        })

        socket.on('disconnect', () => {
            console.log('user is disconnected')
        })
    }) 


};  