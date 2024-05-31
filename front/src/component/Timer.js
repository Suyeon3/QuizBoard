import { useContext, useState, useRef, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { PlayerContext } from "../context/PlayerContext";
import useSelectDrawer from "../hooks/useSelectDrawer";
import styles from '../style/timer.module.css';

export default function Timer() {
    const { answer } = useContext(CategoryContext);
    const { drawer } = useContext(PlayerContext);
    const { replaceDrawer } = useSelectDrawer();

    const time = useRef(90);  // 1분 30초부터 카운트다운
    const timeId = useRef(null);
    const [ min, setMin ] = useState(1);
    const [ sec, setSec ] = useState(30);

    useEffect(() => {
        time.current = 90;
        if (answer) {
            timeId.current = setInterval(() => {
                setMin(Math.floor(time.current / 60));
                setSec(time.current%60);
                time.current -= 1;
            }, 1000);
        }
            
            // answer 바뀔때마다 타이머 다시 실행
            return () => clearInterval(timeId.current);
    }, [answer]);

    useEffect(() => {
        if (time.current < 0) {
            // timeout -> drawer 새로 정해야함...
            clearInterval(timeId.current);
            replaceDrawer();
        }
    }, [sec])

    return (
        <div className={styles.timer}>{min} : {sec}</div>
    )

}