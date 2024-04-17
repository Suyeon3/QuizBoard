import socketIo from "../server";
import Header from './Header';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/home.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { LoginProvider } from "../context/LoginContext";
import { useState, useEffect } from "react";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(location.state?.userName);
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
            socketIo.emit('createRoom', { roomName: `${e.target.value}`, userId: `${userName}` }, () => {
                navigate('/room', {
                    state: {
                        roomName: e.target.value,
                        userId: userName,
                        host: userName
                    }
                });
            });
            setInputShown(false);
            setRoomName('');
        }
    }

    function enterRoom() {
        socketIo.emit('enterRoom', { msg: `${userName} enters room` }, () => {
            receiveRoomName();
        })
    }

    function receiveRoomName() {
        socketIo.on('sendRoomName', (roomName) => {
            try {
                navigate('/room', {
                    state: {
                        roomName: roomName,
                        userId: userName
                    }
                });
            } catch (error) {
                console.error(error);
            }
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