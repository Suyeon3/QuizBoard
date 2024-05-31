import { useContext, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";
import useHash from "../hooks/useHash"
import useSelectDrawer from "../hooks/useSelectDrawer";
import { QuizContext } from "../context/QuizContext";
import styles from '../style/openAnswer.module.css';

export default function OpenAnswer() {
    const { removeHash, OpenAnswerElement } = useHash();
    const { replaceDrawer } = useSelectDrawer();
    const { answer } = useContext(CategoryContext);
    const { setQuizOpen } = useContext(QuizContext);

    
    useEffect(() => {
        
        setQuizOpen(false);
        
        setTimeout(() => {
            removeHash();
            replaceDrawer();
        }, 10000);
        
    }, [])


    return (
        <OpenAnswerElement >
            <div className={styles.modalContainer}>
                <div className={styles.answer}>
                    {answer}
                </div>
            </div>
        </OpenAnswerElement >
    )
}