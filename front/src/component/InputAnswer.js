import socketIo from "../server";
import useHash from '../hooks/useHash';
import { PlayerContext } from '../context/PlayerContext';
import { useContext, useEffect } from "react";
import styles from '../style/inputAnswer.module.css'
import { RoomNameContext } from "../context/RoomNameContext";
import { CategoryContext } from "../context/CategoryContext";

export default function InputAnswer() {
    const { removeHash, HashElement2 } = useHash();
    const { drawer } = useContext(PlayerContext);
    const { roomName } = useContext(RoomNameContext);
    const { setAnswer } = useContext(CategoryContext);

    useEffect(() => {
        socketIo.on('submitAnswer', async (answer) => {
            setAnswer(answer);
            removeHash();
            // Todo: answer가 정해지면 그때부터 시간이 가도록...
        });
        
        return () => {
            socketIo.off('submitAnswer');
        }
    }, [])

    function submitAnswer(e) {
        if (e.keyCode === 13) {
            console.log(e.target.value);
            socketIo.emit('submitAnswer', roomName, e.target.value);
            e.target.value = '';
        }
    }


    if (drawer === socketIo.id) {
        return (
            <HashElement2>
                <div className={styles.background}>
                    <input className={styles.input}
                        onKeyUp={submitAnswer} />
                    <div className={styles.toast}>
                        제시어를 입력해주세요.
                    </div>
                </div>
            </HashElement2>
        )
    } else {
        return (
            <HashElement2>
                <div className={styles.background}>
                    <div className={styles.toast}>제시어 입력중..</div>
                </div>
            </HashElement2>
        )
    }

}
