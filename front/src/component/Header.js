import LoginBtn from "./LoginBtn";
import SignInBtn from "./SignInBtn";
import styles from '../style/home.module.css'

export default function Header({ page }) {

    if (page === 'home') {
        return (
            <div className={styles.header}>
                <button>home</button>
                <LoginBtn />
            </div>
        )
    }
    else if (page === 'login') {
        return (
            <div className={styles.header}>
                <SignInBtn />
            </div>
        )
    }

}