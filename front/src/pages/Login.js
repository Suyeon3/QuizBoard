import socketIo from "../server";
import { useAuthStore } from "../store/useAuthStore";
import Header from './Header';
import styles from '../style/login.module.css';
import { useState } from "react";
import axios from 'axios';
import { getCookie } from '../cookies';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = () => {
        setPassword(e.target.value);
    }

    const handleLogin = () => {
        const userData = {
            email,
            password
        }

        axios.post('http://localhost:5001/auth/login', userData)
            .then((res) => {
                console.log(res.data.message);
                // accessToken을 로컬 스토리지에 저장(XSS에는 취약)
                const accessToken = getCookie('accessToken');
                console.log(`accessToken: ${accessToken}`)
                if (accessToken) {
                    localStorage.setItem('accessToken', accessToken);
                }

            })
            .catch((error) => {
                console.log(error.message);
            })
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
                                placeholder="이메일 입력"
                                value={email}
                                onChange={handleEmail}>
                            </input><br />
                            <input
                                className={styles.pwInput}
                                name='pw'
                                type='password'
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={handlePassword}>
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