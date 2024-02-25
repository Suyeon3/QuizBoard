import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from '../style/home.module.css';

export default function LoginBtn() {
    const location = useLocation();
    console.log(location.state)
    const [isLogin, setIsLogin] = useState(location.state?.isLogin);

    function handleLogout() {
        setIsLogin(!isLogin);
    }

    return (
        <div className='login'>
            {isLogin ? (
                <button onClick={handleLogout}>로그아웃</button>
            ) : (
                <Link to='/login'><button>로그인</button></Link>
            )
            }
        </div>
    )
}