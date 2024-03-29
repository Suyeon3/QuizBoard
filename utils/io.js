const User = require('../Models/user');
const Room = require('../Models/room');

module.exports = function (io) {
    //io~~
    io.on('connection', async (socket) => {
        console.log('client is connected', socket.id);

        socket.on('login', async (userId, cb) => {
            try {
                const user = await User.findOne({ userId });
                user.sid = socket.id;   // Todo: 토큰 JWT 방식으로..
                console.log(user.sid)
                cb({ ok: true, data: user });
            } catch (error) {
                cb({ ok: false, error: error.message })
            }

        })

        socket.on('createRoom', async (data, done) => {
            try {
                console.log(`${data.userId} created ${data.roomName} room.`);
                const user = await User.findOne({ userId: data.userId });
                socket.join(data.roomName);
                console.log(socket)
                await Room.create({
                    roomName: data.roomName,
                    host: user._id,
                    registeredMembers: [user._id],
                    allMembers: [socket.id],
                    status: true,
                });
                console.log('db에 룸 정보 저장');
                done();
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        })

        socket.on('enterRoom', async (msg, cb) => {
            try {
                console.log(msg);
                const rooms = await Room.aggregate([{ $match: { status: true } }, { $sample: { size: 1 } }]);
                if (rooms.length > 0) {
                    const room = rooms[0];
                    socket.join(room.roomName);
                    console.log(socket.adapter.rooms);
                    await Room.updateOne({ _id: room._id }, { $push: { allMembers: socket.id } });
                    sendRoomName(room.roomName);
                } else {
                    console.log('No rooms available.');
                }
                cb()
            } catch (error) {
                console.log(error.message)
                cb({ ok: false, error: error.message })
            }
        })

        function sendRoomName(roomName) {
            socket.emit('sendRoomName', roomName);
            console.log('서버에서 sendRoomName 실행됨');
        }

        socket.on('hostLeaveRoom', async (roomName) => {
            socket.leave(roomName);
            console.log(`${socket.id}가 ${roomName}을 나감`);
            await Room.deleteOne({ roomName: roomName });
        }) 

        socket.on('guestLeaveRoom', async (roomName) => {
            socket.leave(roomName);
            console.log(`${socket.id}가 ${roomName}을 나감`);
            const room = await Room.findOne({ roomName: roomName });
            const {allMembers} = room;
            const newMembers = allMembers.filter(member => member !== socket.id);
            await Room.updateOne({ roomName: roomName }, { allMembers: newMembers });
        })

        socket.on('disconnect', () => {
            console.log('user is disconnected')
        })
    })


};  