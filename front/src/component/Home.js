import socketIo from "../server";
import Header from './Header';
import Logo from '../img/Logo.png';
import LogoImg from '../img/LogoImage.png';
import styles from '../style/home.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginContext } from '../context/LoginContext';
import { RoomNameContext } from "../context/RoomNameContext";

export default function Home() {
    const { isLogin, userId, handleUserName } = useContext(LoginContext);
    const { roomName, handleRoomName} = useContext(RoomNameContext);
    const navigate = useNavigate();
    const [isInputShown, setInputShown] = useState(false);

    function createRoom() {
        if (isLogin) {
            setInputShown(true);
        } else {
            alert('비회원은 방 생성이 불가합니다.');
        }
    }

    function createRoomName(e) {
        if (e.keyCode === 13) {
            socketIo.emit('createRoom', { roomName: `${e.target.value}`, userId: `${userId}` }, () => {
                navigate('/room', {
                    state: {
                        isHost: true
                    }
                });
            });
            setInputShown(false);
            e.target.value = '';
        }
    }

    function enterRoom() {
        socketIo.emit('enterRoom', { msg: `${socketIo.id} enters room` });
    }

    socketIo.on('sendRoomName', (roomName, totalAnony) => {
        try {
            handleRoomName(roomName);
            if (!isLogin) {
                handleUserName(`익명 ${totalAnony+1}`);
            };
            navigate('/room', {
                isHost: false,
            });
        } catch (error) {
            console.error(error);
        }
    })


    return (
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
                                onChange={(e) => handleRoomName(e.target.value)}
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
    )

}