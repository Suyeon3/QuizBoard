import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const navigate = useNavigate();

    // Todo: 쿠키에 token 저장하고 메인으로 리다이렉트?

    useEffect(() => {
    }, [userId, userPw])

    function handleLogin() {
        console.log(userId);
        const userData = {
            userId,
            userPw
        };
        // Todo: axios로 ajax방식 수정
        fetch('http://localhost:5001/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.isLogin === true) {
                    // alert("로그인 성공");
                    navigate('/', {
                        state: {
                            isLogin: json.isLogin
                        }
                    });
                }
                else {
                    alert(json.isLogin);
                }
            });

    }



    return (
        <div>
            <h1>login</h1>
            <label htmlFor='id'>ID</label>
            <input
                className="id"
                name='id'
                type='text'
                placeholder="아이디 입력"
                value={userId}
                onChange={e => {
                    setUserId(e.target.value);
                }}>
            </input><br />
            <label htmlFor='pw'>PW</label>
            <input
                className="pw"
                name='pw'
                type='password'
                placeholder="비밀번호 입력"
                value={userPw}
                onChange={e => {
                    setUserPw(e.target.value);
                }}>
            </input><br />
            <button onClick={handleLogin}>로그인</button>
            <button>회원가입</button>
        </div>

    )
}