const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
// const routes = require('./routes.js');
const { createServer } = require('http');
const { Server } = require('socket.io');

const db = mongoose.connection;

mongoose.connect(process.env.DB)
    .catch(error => handleError(error))
    .then(() => {
        console.log('connected to database');
    });

app.use(express.static(path.join(__dirname, 'front', 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    }
})

require("./utils/io")(io);
const User = require('./Models/user');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'public', 'index.html'));
})

app.post('/login', async (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPw;
    const sendData = {
        isLogin: undefined
    };

    try {
        if (username && password) {
            const user = await User.findOne({ userId: username });
            if (user) {   // 아이디 일치
                // Todo: 입력된 비밀번호가 해시된 저장값과 같은지 비교
                if (user.password === password) {
                    // Todo: 세션 정보 갱신으로 수정
                    sendData.isLogin = true;

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

httpServer.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
})

module.exports = app;