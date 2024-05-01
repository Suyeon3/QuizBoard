import React from "react";
import { useContext } from "react";
import styles from '../style/modal.module.css';
import BackButton from '../img/backButton.png';
import { PlayGameContext } from "../context/PlayGameContext";
import { useModal } from "../logic/useModal";

export default function LeaveGameModal() {
    const handlePlayGame = useContext(PlayGameContext);
    const { modalOpen, openModal, closeModal } = useModal();


    return (
        <>
            <div className={styles.buttonWrap}>
                <img
                    className={styles.modalOpenBtn}
                    src={BackButton}
                    onClick={openModal}
                />
            </div>
            {
                modalOpen &&
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <button onClick={closeModal}>계속하기</button>
                        <button onClick={handlePlayGame}>나가기</button>
                    </div>
                </div>
            }
        </>
    )
}