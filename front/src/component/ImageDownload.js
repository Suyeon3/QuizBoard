import { useRef } from "react";
import styles from '../style/imgDownBtn.module.css';

export default function ImageDownload({ canvas }) {
    const imgDownRef = useRef(null);

    function handleSaveImg() {
        const img = canvas.toDataURL('image/jpeg');
        const link = imgDownRef.current;
        link.href = img;
        link.download = 'QuizBoard';
        link.click();
    }

    return (
        <a
            ref={imgDownRef}
            onClick={handleSaveImg}
            className={styles.saveBtn}
        >이미지 저장</a>
    )
}