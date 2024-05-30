import socketIo from "../server";
import useHash from '../hooks/useHash';
import { PlayerContext } from '../context/PlayerContext';
import { useContext, useEffect, useRef, memo } from "react";
import styles from '../style/inputAnswer.module.css'
import { RoomNameContext } from "../context/RoomNameContext";
import { HostContext } from "../context/HostContext";
import { CategoryContext } from "../context/CategoryContext";

//Todo: drawer context로 설정해서 상태값 끌고 오기
export default function InputAnswer() {
    const { setHash, removeHash, HashElement2 } = useHash();
    const { players, drawer, setDrawer } = useContext(PlayerContext);
    const { isHost } = useContext(HostContext);
    const { roomName } = useContext(RoomNameContext);
    const { answer, setAnswer } = useContext(CategoryContext);
    const isMounted = useRef(false);

    useEffect(() => {
        console.log(`players: ${players}`);
        if (players[0]) {
            if (isHost) socketIo.emit('selectDrawer', roomName, players);
        }
    }, [])

    useEffect(() => {
        socketIo.on('selectDrawer', async (drawer) => {
            setDrawer(players[drawer]);
        });

        socketIo.on('submitAnswer', async (answer) => {
            setAnswer(answer);
        });

        return () => {
            socketIo.off('selectDrawer');
            socketIo.off('submitAnswer');
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            console.log(drawer);
            setHash('inputAnswer');
        } else {
            isMounted.current = true;
        }
    }, [drawer])

    function submitAnswer(e) {
        if (e.keyCode === 13) {
            socketIo.emit('submitAnswer', roomName, e.target.value);
            removeHash();
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
