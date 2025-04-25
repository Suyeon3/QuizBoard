const User = require('../Models/user');

exports.checkEmailDupli = async(req, res) => {
    try {
        console.log('checkEmailDupli')
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: '이메일 중복 검사 실패' });
        }
        return res.status(200).json({ message: '이메일 중복 검사 성공' });
    } catch {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }

}

exports.checkUsernameDupli = (req, res, next) => {
    const { username } = req.body;
    const user = User.findOne({ username });
    if (user) {
        return res.status(409).json({ message: '닉네임 중복 검사 실패' });
    } else {
        return res.status(200).json({ message: '닉네임 중복 검사 성공' });
    };
    next();
}