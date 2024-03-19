import socketIo from "../server";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import styles from '../style/login.module.css';

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
                    socketIo.emit('login', userId, (res) => {
                        console.log("Res", res)
                    });
                    navigate('/', {
                        state: {
                            isLogin: json.isLogin,
                            userName: json.userName
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
            <Header page={'login'} />
            <div className={styles.wrap}>
                <h1 className={styles.title}>login</h1>
                <div className={styles.container}>
                    <div className={styles.loginWrap}>
                        <div className={styles.inputWrap}>
                            <input
                            className={styles.idInput}
                            name='id'
                            type='text'
                            placeholder="아이디 입력"
                            value={userId}
                            onChange={e => {
                                setUserId(e.target.value);
                            }}>
                        </input><br />
                        <input
                            className={styles.pwInput}
                            name='pw'
                            type='password'
                            placeholder="비밀번호 입력"
                            value={userPw}
                            onChange={e => {
                                setUserPw(e.target.value);
                            }}>
                        </input><br />
                        </div>
                        
                        <button
                            onClick={handleLogin}
                            className={styles.loginBtn}>
                        로그인
                        </button>
                    </div>

                    <ul className={styles.etcWrap}>
                        <button className={styles.findIdBtn}>아이디 찾기</button>
                        <button className={styles.findPwBtn}>비밀번호 찾기</button>
                        <button className={styles.SignUp}>회원가입</button>
                    </ul>

                </div>

            </div>

        </div>

    )
}