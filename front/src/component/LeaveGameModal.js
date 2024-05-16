import React from "react";
import { useContext } from "react";
import styles from '../style/modal.module.css';
import BackButton from '../img/backButton.png';
import { PlayGameContext } from "../context/PlayGameContext";
import useHash from "../hooks/useHash";

export default function LeaveGameModal(props) {
    const handlePlayGame = useContext(PlayGameContext);
    const { setHash, removeHash, HashElement } = useHash();

    return (
        <>
            <div className={styles.buttonWrap}>
                <img
                    className={styles.modalOpenBtn}
                    src={BackButton}
                    onClick={() => setHash('modal')}
                />
            </div>
            <HashElement>
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <button onClick={removeHash}>계속하기</button>
                        <button onClick={handlePlayGame}>나가기</button>
                    </div>
                </div>
            </HashElement>
        </>
    )
}