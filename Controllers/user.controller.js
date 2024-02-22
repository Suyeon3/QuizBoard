const User = require('../Models/user');
const userController = {}

userController.saveUser = async(userName, sid) => {
    // 이미 있는 유저인지 확인
    let user = await User.findOne({userName});
    // 없다면 새로 유저정보 만들기
    if (!user) {
        user = new User({
            name: userName,
            // 갤러리 정보 추가
            token: sid,
            online: true,
        })
    }
    // 이미 있는 유저라면 연결정보 token값만 바꿔주자.
    user.token = sid;
    user.online = true;
    
    await user.save()
    return user;
}

module.exports = userController