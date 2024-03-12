import socketIo from "../server";
import Header from './Header';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/home.module.css';
import { LoginProvider } from "../context/LoginContext";


export default function Home() {
    // Todo: 방 생성하기 누르면 '방입력하기' 란으로 바뀌기, 서버에 방 조인 요청

    function enterRoom() {
        socketIo.emit('enterRoom', { msg: `${socketIo.id} enters room` }, () => {
            console.log('server is done');
        })
    }

    return (
        <div>
            <LoginProvider>
                <Header page={'home'}/>
                <div className={styles.container}>
                    <div className={styles.logoWrap}>
                        <img src={LogoImg} className={styles.logoImg} />
                        <img src={Logo} className={styles.logo} />
                    </div>
                    <div className={styles.btnWrap}>
                        <div className={styles.createRoom}>방 생성하기</div>
                        <div className={styles.enterRoom} onClick={enterRoom}>게임 참가</div>
                    </div>
                </div>
            </LoginProvider>

        </div>
    )

}