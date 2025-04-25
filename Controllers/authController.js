const dotenv = require('dotenv').config();
const User = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const accesskey = process.env.ACCESS_TOKEN_KEY;
const refreshkey = process.env.REFRESH_TOKEN_KEY;

// 엑세스 토큰 검증을 위한 미들웨어
const verifyAccessToken = async (req, res, next) => {
    // auth에서 accessToken 획득
    const authHeader = req.header.authorization;
    const token = authHeader && authHeader.split(' ')[1]    // Bearer 제거
    if (!token) return res.status(401).send({ message: '엑세스 토큰 없음' });

    // access token 검증
    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            req.expired = true;
            console.error(err.message);
        }
        // Todo: 수정 필요
        req.user = user;
        next();
    }
    )
}

// 엑세스 토큰 만료 시 재발급을 위한 미들웨어
const replaceAccessToken = async (req, res, next) => {
    if (req.expired) {
        try {
            const cookies = req.cookies;

            if (!cookies?.issuebombomCookie)
                return res.status(403).send({ message: '엑세스 토큰 재발급 위한 쿠키 없음' })

            const refreshToken = cookies.issuebombomCookie;
            const user = await User.findOne({ refreshToken });
            if (!user)
                return res.status(403).send({ message: '해당 쿠키에는 등록된 리프레쉬 토큰이 없음' })

            // 쿠키 검증
            jwt.verify(refreshToken, refreshkey, (err, user) => {
                if (err)
                    return res.status(403).send({ message: '리프레시 토큰이 만료됨(재로그인 필요)' });
                const accessToken = jwt.getAccessToken();
                res.setHeader('Authorization', `Bearer ${accessToken}`);
                res.status(200).json({ message: '엑세스 발급이 만료되어 재발급' });
            })
        } catch (err) {
            console.error(err.message);
        }

    } else {
        next();
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: '유효하지 않은 이메일입니다' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
        }

        // 토큰 생성
        const tokenManager = createAccessTokenManager(user.username, user.email);
        // 외부에서 직접 접근할 수 없음
        const accessToken = tokenManager.getAccessToken();
        res.cookie('accessToken', accessToken, {
            httpOnly: true,  // JavaScript 접근 차단
            secure: true,    // HTTPS만 허용
            sameSite: 'Strict' // CSRF 방지
        });
        res.status(200).json({ message: '로그인 성공' })
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ message: '서버 오류' });
    }
}


// 클로저로 accessToken private화
const createAccessTokenManager = (username, email) => {
    const accessToken = jwt.sign({ username: username, email: email }, accesskey, { expiresIn: '30m' });

    return {
        getAccessToken: () => accessToken
    };
};


exports.join = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        // 비밀번호 해쉬
        const user = await User.findOne({ email });
        if (!user) {
            const saltRounds = 13;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = new User({
                email: email,
                password: hashedPassword,
                username: username,
            });
            await user.save();

            // 가입후 메인화면으로 리다이렉트
            return res.status(200).json({
                message: '회원가입 성공',
                success: true,
                redirectUrl: "/"
            });
        } else {
            return res.status(409).json({message: "이미 존재하는 이메일입니다"})
        }

    } catch (error) {
        console.error("회원가입 오류:", error);
        return res.status(500).json({ error: "회원가입 실패" });
    }
}