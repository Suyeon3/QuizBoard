import React from "react";
import { useState } from "react";
import styles from '../style/modal.module.css';
import BackButton from '../img/backButton.png';

export default function ModalButton(props) {
    const { handlePlayGame } = props;
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