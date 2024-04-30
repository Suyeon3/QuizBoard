import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import styles from '../style/header.module.css';

export default function LoginBtn() {
    const { isLogin, handleLoginState } = useContext(LoginContext);

    return (
        <div className='login'>
            {isLogin ? (
                // 서버도 로그아웃하기
                <button onClick={handleLoginState} className={styles.login}>로그아웃</button>
            ) : (
                <Link to='/login'><button className={styles.login}>로그인</button></Link>
            )
            }
        </div>
    )
}