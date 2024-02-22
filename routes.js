const express = require('express');
const path = require('path');
const router = express.Router();


// app.use(express.static(path.join(__dirname, '/front/public')));
// Todo: 해시, 세션 사용
// const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    // res.sendFile(index, "index.html");
    res.send({message: 'hello'});
})

/*
router.post('/login', (req,res) => {
    const username = req.body.userId;
    const password = req.body.userPw;
    const sendData = { isLogin: "" };

    if (username && password) {
        db.users.find({ userId: username }, (err, user) => {
            if (err) throw err;
            if (user) {   // 아이디 일치
                if (result.password === password) {
                    // Todo: 입력된 비밀번호가 해시된 저장값과 같은지 비교
                    // Todo: 세션 정보 갱신으로 수정
                    sendData.isLogin = "True";
                    return res.status(200).json({message: '로그인 성공', data: user});
                }
                else {  // 아이디 일치한데 비밀번호 불일치
                    sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
                    res.send(sendData);
                }
            } else {    // 아이디 일치값 없음
                sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                res.send(sendData);
            }
        });
    } else {    // 아이디, 비밀번호 중 입력되지 않은 값이 있음
        sendData.isLogin = "아이디와 비밀번호를 입력하세요.";
        res.send(sendData);
    }
});
*/
module.exports = router;