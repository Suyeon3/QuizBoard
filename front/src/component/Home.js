import socketIo from "../server";
import Header from './Header';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/home.module.css';
import { useLocation } from "react-router-dom";
import { LoginProvider } from "../context/LoginContext";
import { useState } from "react";

export default function Home() {
    const location = useLocation();
    // Todo: 방 생성하기 누르면 '방입력하기' 란으로 바뀌기, 서버에 방 조인 요청
    const [isInputShown, setInputShown] = useState(false);
    const [roomName, setRoomName] = useState('');

    function createRoom() {
        if (location.state?.isLogin) {
            setInputShown(true);
        } else {
            alert('비회원은 방 생성이 불가합니다.');
        }
    }

    function handleRoomName(e) {
        setRoomName(e.target.value);
    }

    function createRoomName(e) {
        if (e.keyCode === 13) {
            socketIo.emit('createRoom', e.target.value, () => {
                console.log('server is done');
            })
        }
    }

    function enterRoom() {
        socketIo.emit('enterRoom', { msg: `${socketIo.id} enters room` }, () => {
            console.log('server is done');
        })
    }

    return (
        <LoginProvider>
            <div>
                <Header page={'home'} />
                <div className={styles.container}>
                    <div className={styles.logoWrap}>
                        <img src={LogoImg} className={styles.logoImg} />
                        <img src={Logo} className={styles.logo} />
                    </div>
                    <div className={styles.btnWrap}>
                        {isInputShown ? (
                            <input
                                className={styles.createRoom_input}
                                type='text'
                                value={roomName}
                                onChange={handleRoomName}
                                onKeyUp={createRoomName}
                                placeholder="방 이름을 입력하세요"
                            />
                        ) : (
                            <div className={styles.createRoom} onClick={createRoom}>방 생성하기</div>
                        )}
                        <div className={styles.enterRoom} onClick={enterRoom}>게임 참가</div>
                    </div>
                </div>
            </div>
        </LoginProvider>
    )

}