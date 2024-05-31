import { useState, useContext, useEffect } from 'react';
import socketIo from "../server";
import styles from '../style/chat.module.css';
import { RoomNameContext } from '../context/RoomNameContext';
import { LoginContext } from '../context/LoginContext';
import { QuizContext } from '../context/QuizContext';
import { CategoryContext } from '../context/CategoryContext';
import useHash from '../hooks/useHash';

const MAX_MESSAGES = 30;

export default function Chat() {
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);
    const { roomName } = useContext(RoomNameContext);
    const { userName } = useContext(LoginContext);
    const { quizOpen } = useContext(QuizContext);
    const { answer } = useContext(CategoryContext);
    const { setHash } = useHash();
    const socket = socketIo;

    useEffect(() => {

        function receiveMessage(newMsg, sid, userName) {
            
            if (newMsg === answer) {
                setTimeout(() => {
                    console.log('openAnswerTimerId')
                    setHash('openAnswer');
                }, 1000);
            }
            const msgType = (sid === socket.id) ? 'right_message' : 'left_message';
            setMsgList((prevList) => [{ message: newMsg, type: msgType, userName: userName }, ...prevList]);
        };

        socket.on('receiveMsg', receiveMessage);

        return () => {
            socket.off('receiveMsg', receiveMessage);
        };

    }, []);

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
                        <span
                            className={styles.content}
                            style={{ background: quizOpen && answer === msgObj.message ? '#92EF71' : '' }}
                        >{msgObj.message}</span>
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