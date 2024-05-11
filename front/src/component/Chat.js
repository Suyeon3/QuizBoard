import { useState, useContext, useEffect } from 'react';
import socketIo from "../server";
import styles from '../style/chat.module.css';
import { RoomNameContext } from '../context/RoomNameContext';
import { LoginContext } from '../context/LoginContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Chat() {
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const { roomName } = useContext(RoomNameContext);
    const { userName } = useContext(LoginContext);
    const socket = socketIo;

    useEffect(() => {

        function receiveMessage(newMsg) {
            //Todo: 메세지 채팅창에 띄우기
            console.log(`${userName}: ${newMsg}`);
            setMsgList((prevList) => [newMsg, ...prevList]);
        }

        socket.on('receiveMsg', receiveMessage)

        return () => {
            socket.off('receiveMsg', receiveMessage);
        };

    }, [socket, userName])

    useEffect(() => {
        console.log(msgList);
    }, [msgList])

    function sendMessage() {
        socket.emit('sendMsg', roomName, msg);
        setMsg('');
    };

    return (
        <div className={styles.container}>
            <TransitionGroup className={styles.chat_field}>
                {msgList.map((message, idx) => (
                    <CSSTransition key={idx} timeout={500} className={styles.message}>
                        <div className={styles.message_box}>{message}</div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            <div className={styles.chat_input_field}>
                <input
                    type='text'
                    placeholder='텍스트를 입력하세요'
                    className={styles.text_input}
                    value={msg}
                    onChange={e => setMsg(e.target.value)}>
                </input>
                <span
                    className={styles.text_send}
                    onClick={sendMessage}>
                    전송
                </span>
            </div>
        </div>
    )
}