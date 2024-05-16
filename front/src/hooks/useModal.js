import { useState } from "react";

export function useModal() {
    const [modalToggle, setModalToggle] = useState(false);

    function openModal() {
        setModalToggle(true);
    }

    function closeModal() {
        setModalToggle(false);
    }

    return {
        modalToggle,
        openModal,
        closeModal
    };
}
