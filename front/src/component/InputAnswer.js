import socketIo from "../server";
import useDrawerHandler from "../hooks/useDrawerHandler";
import useHash from '../hooks/useHash';
import { DrawerContext } from '../context/PlayerContext';
import { useContext } from "react";
import styles from '../style/inputAnswer.module.css'

//Todo: drawer context로 설정해서 상태값 끌고 오기
export default function inputAnswer() {
    const { setHash, removeHash, HashElement } = useHash();
    const { players, drawer, setDrawer } = useContext(DrawerContext);
    const [showInputAnswer, setShowInputAnswer] = useState(false);

    useEffect(() => {
        if (players[0]) {
            const drawer = Math.floor(Math.random * players.length);
            setDrawer(drawer);
        }
    }, [players])

    useEffect(() => {
        // drawer가 바뀌면 어떻게 하지?
        // setModal을 하고, 조건문으로 렌더링 다르게
        if (drawer === socketIo.id) setShowInputAnswer(true);
        setHash('inputAnswer');
    }, [drawer])

    return (
        <HashElement>
            {showInputAnswer ? 
            <div className={styles.background}>
                <input />
                <div className={styles.toast}>제시어를 입력해주세요.</div>
            </div> 
            : 
            <div className={styles.background}>
                <div className={styles.toast}>제시어 입력중..</div>
            </div>}
        </HashElement>
    )
}