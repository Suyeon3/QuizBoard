import React from "react";
import { useContext } from "react";
import styles from '../style/modal.module.css';
import BackButton from '../img/backButton.png';
import useHash from "../hooks/useHash";
import useLeaveRoom from '../hooks/useLeaveRoom';
import { CategoryContext } from "../context/CategoryContext";
import { HostContext } from "../context/HostContext";
import { PlayGameStateContext } from "../context/PlayGameStateContext";

export default function LeaveGameModal() {
    const { isHost } = useContext(HostContext);
    const { categoryIsOn, setCategoryIsOn } = useContext(CategoryContext);
    const { setPlayGame } = useContext(PlayGameStateContext);
    const { setHash, removeHash, HashElement } = useHash();
    const leaveRoom = useLeaveRoom();

    return (
        <>
            <div className={styles.buttonWrap}>
                <img
                    className={styles.modalOpenBtn}
                    src={BackButton}
                    onClick={() => setHash('leaveModal')}
                />
            </div>
            <HashElement>
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <button onClick={removeHash}>계속하기</button>
                        <button onClick={() => {
                            removeHash();
                            if (isHost) {
                                setPlayGame(false);
                                if (categoryIsOn) setCategoryIsOn(false);
                            } else {
                                leaveRoom();
                            }
                        }}>나가기</button>
                    </div>
                </div>
            </HashElement>
        </>
    )
}