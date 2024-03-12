import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import styles from '../style/header.module.css';

export default function LoginBtn() {
    const { isLogin, handleLogout } = useContext(LoginContext);

    return (
        <div className='login'>
            {isLogin ? (
                <button onClick={handleLogout} className={styles.login}>로그아웃</button>
            ) : (
                <Link to='/login'><button className={styles.login}>로그인</button></Link>
            )
            }
        </div>
    )
}