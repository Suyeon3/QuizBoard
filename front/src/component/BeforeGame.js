import { useContext, useEffect } from 'react';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/beforegame.module.css';
// import { PlayGameContext } from '../context/PlayGameContext';
import Chat from './Chat';
import useLeaveRoom from '../hooks/useLeaveRoom';
import useBackHandler from '../hooks/useBackHandler';
import { PlayGameStateContext } from '../context/PlayGameStateContext';
import { CategoryContext } from '../context/CategoryContext';
import { PlayerContext } from '../context/PlayerContext';

export default function BeforeGame() {
    const { setTheme, setAnswer } = useContext(CategoryContext)
    const { setPlayGame } = useContext(PlayGameStateContext)
    const { setDrawer } = useContext(PlayerContext);
    // const handlePlayGame = useContext(PlayGameContext);
    const leaveRoom = useLeaveRoom();

    useBackHandler();

    useEffect(() => {
        setDrawer('');
        setTheme('');
        setAnswer('');
    }, [])

    function startGame() {
        setPlayGame(true);
    }

    return (
        <div>
            <button
                onClick={leaveRoom}
                className={styles.leaveBtn}
            >퇴장하기</button>
            <div className={styles.container}>
                <div className={styles.logoWrap}>
                    <img src={LogoImg} className={styles.logoImg} />
                    <img src={Logo} className={styles.logo} />
                </div>
                <div className={styles.btnWrap}>
                    <div className={styles.startBtn} onClick={startGame}>게임 시작</div>
                </div>
                <Chat />
            </div>
        </div>
    )
}