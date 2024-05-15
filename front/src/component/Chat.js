import { useState, useContext, useEffect } from 'react';
import socketIo from "../server";
import styles from '../style/chat.module.css';
import { RoomNameContext } from '../context/RoomNameContext';
import { LoginContext } from '../context/LoginContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const MAX_MESSAGES = 30;

export default function Chat() {
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const [msgType, setMsgType] = useState('');
    const { roomName } = useContext(RoomNameContext);
    const { userName } = useContext(LoginContext);
    const socket = socketIo;

    useEffect(() => {

        function receiveMessage(newMsg, sid, userName) {
            //Todo: 메세지 채팅창에 띄우기
            // console.log(`${userName}: ${newMsg}`);
            const msgType = (sid === socket.id) ? 'right_message' : 'left_message';
            setMsgList((prevList) => [{message: newMsg, type: msgType, userName: userName}, ...prevList]);
        }

        socket.on('receiveMsg', receiveMessage) 

        return () => {
            socket.off('receiveMsg', receiveMessage);
        };

    }, [socket, userName])

    useEffect(() => {
        if (msgList.length > MAX_MESSAGES) {
            msgList.pop();
        }
    }, [msgList])

    function sendMessage() {
        socket.emit('sendMsg', roomName, userName, msg);
        setMsg('');
    };

    function calculateOpacity(index, totalMessages) {
        // 최상단 메시지가 가장 불투명하고, 아래로 내려갈수록 투명도가 감소하도록 계산
        const maxOpacity = 1;
        const minOpacity = 0.3;
        const step = (maxOpacity - minOpacity) / totalMessages;

        return maxOpacity - step * index;
    };

    return (
        <div className={styles.container}>
            <div className={styles.chat_field}>
                {msgList.map((msgObj, idx) => (
                    <div
                        key={idx}
                        className={`${styles[msgObj.type]}`}
                        style={{ opacity: calculateOpacity(idx, msgList.length) }}
                    >
                        <span className={styles.user}>{msgObj.userName}</span>
                        <span className={styles.content}>{msgObj.message}</span>
                    </div>
                ))}
            </div>
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