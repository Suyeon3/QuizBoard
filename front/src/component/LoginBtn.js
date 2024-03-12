import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from '../style/header.module.css';

export default function LoginBtn({ isLogin, handleLogout }) {

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