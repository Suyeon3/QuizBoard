import React from "react";
import { useState, useContext } from "react";
import styles from '../style/modal.module.css';
import BackButton from '../img/backButton.png';
import { PlayGameContext } from "../context/PlayGameContext";

export default function ModalButton() {
    const handlePlayGame = useContext(PlayGameContext);
    const [modalOpen, setModalOpen] = useState(false);

    function handleCloseModal() {
        setModalOpen(false);
    }

    function handleLeaveGame() {
        handlePlayGame();
    }

    return (
        <>
            <div className={styles.buttonWrap}>
                <img
                    className={styles.modalOpenBtn}
                    src={BackButton}
                    onClick={() => setModalOpen(true)}
                />
            </div>
            {
                modalOpen &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <button onClick={handleCloseModal}>계속하기</button>
                        <button onClick={handleLeaveGame}>나가기</button>
                    </div>
                </div>
            }
        </>
    )
}