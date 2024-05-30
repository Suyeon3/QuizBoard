const User = require('../Models/user');
const Room = require('../Models/room');

module.exports = function (io) {
    //io~~
    io.on('connection', async (socket) => {
        console.log('client is connected', socket.id);

        socket.on('login', async (userId, cb) => {
            try {
                const user = await User.findOne({ userId });
                await User.updateOne({ userId }, { $set: { sid: socket.id } });
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
                await Room.create({
                    roomName: data.roomName,
                    host: user._id,
                    registeredMembers: [user._id],
                    allMembers: [socket.id],
                    status: false,
                });
                console.log('db에 룸 정보 저장');
                done();
            } catch (error) {
                cb({ ok: false, error: error.message });
            }
        })

        socket.on('enterRoom', async (msg) => {
            try {
                console.log(msg);
                const rooms = await Room.aggregate([
                    { $match: { status: false, $expr: { $lt: [{ $size: "$allMembers" }, 5] } } },
                    { $sample: { size: 1 } }
                ]);
                if (rooms.length > 0) {
                    const room = rooms[0];
                    const totalAnony = room.allMembers.length - room.registeredMembers.length;
                    socket.join(room.roomName);
                    await Room.updateOne({ _id: room._id }, { $push: { allMembers: socket.id } });
                    socket.emit('sendRoomName', room.roomName, totalAnony);
                } else {
                    alert('No rooms available.');
                }
            } catch (error) {
                console.log(error.message)
            }
        })


        socket.on('allLeaveRoom', async (roomName) => {
            io.to(roomName).emit('deleteRoom');
            console.log(`host가 ${roomName}을 삭제`);
            io.socketsLeave(roomName);
            await Room.deleteOne({ roomName: roomName });
        })

        socket.on('guestLeaveRoom', async (roomName) => {
            socket.leave(roomName);
            console.log(`${socket.id}가 ${roomName}을 나감`);
            const room = await Room.findOne({ roomName: roomName });
            const { allMembers } = room;
            const newMembers = allMembers.filter(member => member !== socket.id);
            await Room.updateOne({ roomName: roomName }, { allMembers: newMembers });
        })

        socket.on('handlePlayGame', async (roomName, playGameState) => {
            await Room.updateOne({ roomName: roomName }, { status: playGameState });
            socket.to(roomName).emit('handlePlayGame', playGameState);
            console.log(`서버: playGameState ${playGameState}로 받음`)
        })

        socket.on('stopDraw', async (roomName, position) => {
            io.to(roomName).emit('stopDraw', position.mouseX, position.mouseY);
        })

        socket.on('startDraw', async (roomName, position) => {
            io.to(roomName).emit('startDraw', position.mouseX, position.mouseY);
        })

        socket.on('changeColor', async (roomName, color) => {
            io.to(roomName).emit('changeColor', color);
        })

        socket.on('reset', async (roomName, resetFillColor) => {
            io.to(roomName).emit('reset', resetFillColor);
        })

        socket.on('sendMsg', async (roomName, userName, msg) => {
            io.to(roomName).emit('receiveMsg', msg, socket.id, userName);
        })

        socket.on('categoryScreenShare', async (roomName, data) => {
            io.to(roomName).emit('categoryScreenShare', data);
        });

        socket.on('categoryOff', async (roomName, categoryIsOn) => {
            io.to(roomName).emit('categoryOff', categoryIsOn);
        })

        socket.on('selectDrawer', async (roomName, players) => {
            const drawer = Math.floor(Math.random() * players.length);
            io.to(roomName).emit('selectDrawer', drawer);
        })

        socket.on('submitAnswer', async (roomName, answer) => {
            io.to(roomName).emit('submitAnswer', answer);
        })

        socket.on('disconnect', () => {
            console.log('user is disconnected')
        })
    })


};  