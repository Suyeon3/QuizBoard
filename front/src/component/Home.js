import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import styles from '../style/home.module.css';

export default function Home() {
    const location = useLocation();
    console.log(location.state)
    const [isLogin, setIsLogin] = useState(location.state?.isLogin);

    function handleLogout() {
        setIsLogin(!isLogin);
    }

    return (
        <div>
            {/* <div className={styles.header}>
                <button>home</button>
                
                {isLogin ? (
                    <button onClick={handleLogout}>로그아웃</button>
                    ) : (
                    <Link to='/login'><button>로그인</button></Link>
                    )
                }
            </div> */}
            <Header page={'home'}/>
        </div>
    )

}