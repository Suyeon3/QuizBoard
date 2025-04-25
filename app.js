require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const httpServer = createServer(app);
// const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
})

require("./utils/io")(io);

// const routes = require('./routes.js');

// const db = mongoose.connection;

// mongoose.connect(process.env.REACT_APP_DB)
//     .catch(error => handleError(error))
//     .then(() => {
//         console.log('connected to database');
//     });

const User = require('./Models/user');
const Room = require('./Models/room');


//??
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'public', 'index.html'));
})

app.post('/login', async (req, res) => {
    const userid = req.body.inputId;
    const password = req.body.inputPw;
    const sendData = {
        isLogin: undefined,
        userId: undefined,
        userName: undefined
    };

    try {
        if (userid && password) {
            const user = await User.findOne({ userId: userid });
            if (user) {   // 아이디 일치
                // Todo: 입력된 비밀번호가 해시된 저장값과 같은지 비교
                if (user.password === password) {
                    // Todo: 세션 정보 갱신으로 수정
                    sendData.isLogin = true;
                    sendData.userId = user.userId;
                    sendData.userName = user.userName;

                    return res.send(sendData);
                }
                else {  // 아이디 일치한데 비밀번호 불일치
                    sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
                    res.send(sendData);
                }
            } else {    // 아이디 일치값 없음
                sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                res.send(sendData);
            }

        } else {    // 아이디, 비밀번호 중 입력되지 않은 값이 있음
            sendData.isLogin = "아이디와 비밀번호를 입력하세요.";
            res.send(sendData);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("서버 에러");
    }
});

app.post('/players', async (req, res) => {
    const roomName = req.body.roomName;
    const sendData = { players : undefined };
    try {
        const room = await Room.findOne({ roomName: roomName });
        console.log(room.allMembers);
        sendData.players = room.allMembers;
        res.json(sendData);
    } catch (err) {
        console.error(err);
    }
})


httpServer.listen(process.env.REACT_APP_PORT || 5001, () => {
    console.log('server listening on port', process.env.REACT_APP_PORT);
})

module.exports = app;