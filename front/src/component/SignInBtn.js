import { Link, useLocation } from 'react-router-dom';
import styles from '../style/header.module.css';

export default function SignInBtn() {
    return (
        <div>
            <Link to='./signIn'><button className={styles.login}>회원가입</button></Link>
        </div>
    )
}