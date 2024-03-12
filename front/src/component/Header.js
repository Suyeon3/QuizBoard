import LoginBtn from "./LoginBtn";
import SignInBtn from "./SignInBtn";
import { Link } from 'react-router-dom';
import Logo from '../img/Logo.png';
import styles from '../style/header.module.css'

export default function Header({ page, isLogin, handleLogout }) {

    if (page === 'home') {
        return (
            <div className={styles.header}>
                <Link to='/'><img src={Logo} className={styles.logo}/></Link>
                <div className={styles.menu}>
                    <LoginBtn isLogin={isLogin} handleLogout={handleLogout}/>
                    <SignInBtn />  
                </div>
                
            </div>
        )
    }
    else if (page === 'login') {
        return (
            <div className={styles.header}>
                 <Link to='/'><img src={Logo} className={styles.logo}/></Link>
                <SignInBtn />
            </div>
        )
    }

}