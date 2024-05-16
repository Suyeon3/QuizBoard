import { useContext } from 'react';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/beforegame.module.css';
import { PlayGameContext } from '../context/PlayGameContext';
import Chat from './Chat';
import useLeaveRoom from '../hooks/useLeaveRoom';
import useBackHandler from '../hooks/useBackHandler';

export default function BeforeGame(props) {
    const { playGame } = props;
    const handlePlayGame = useContext(PlayGameContext);
    const leaveRoom = useLeaveRoom();

    useBackHandler(playGame);

    return (
        <div>
            <button onClick={leaveRoom}>퇴장하기</button>
            <div className={styles.container}>
                <div className={styles.logoWrap}>
                    <img src={LogoImg} className={styles.logoImg} />
                    <img src={Logo} className={styles.logo} />
                </div>
                <div className={styles.btnWrap}>
                    <div className={styles.startBtn} onClick={handlePlayGame}>게임 시작</div>
                </div>
            <Chat />
            </div>
        </div>
    )
}