import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/beforegame.module.css';

export default function BeforeGame(props) {
    const { handlePlayGame } = props;
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.logoWrap}>
                    <img src={LogoImg} className={styles.logoImg} />
                    <img src={Logo} className={styles.logo} />
                </div>
                <div className={styles.btnWrap}>
                    <div className={styles.startBtn} onClick={handlePlayGame}>게임 시작</div>
                </div>
            </div>
        </div>
    )
}