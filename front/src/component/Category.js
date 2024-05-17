import styles from '../style/category.module.css';
import ThemeLogo from '../img/theme.png'
import LeaveGameModal from './LeaveGameModal';
import { HostContext } from '../context/HostContext';
import { CategoryContext } from '../context/CategoryContext';
import { useContext } from 'react';

export default function Category() {
    const themeList = ['음식', '영화', '인물', '장소', '사자성어', '속담'];
    const { isHost } = useContext(HostContext);
    const { setTheme, setCategoryIsOn } = useContext(CategoryContext);

    function chooseTheme(e) {
        setTheme(e.target.value);
        setCategoryIsOn(false);
    }

    return (
        <>
            <LeaveGameModal />
            <div className={isHost ? `${styles.enabled}` : `${styles.disabled}`}>
                <div className={styles.container}>
                    <div className={styles.themeLogoWrap}>
                        <img src={ThemeLogo} className={styles.themeLogo} />
                    </div>
                    <div className={styles.themeBox}>
                        <div className={styles.themeListWrap}>
                            {themeList.map((theme, idx) => (
                                <div key={idx} className={styles.theme} onClick={chooseTheme}>
                                    {theme}
                                </div>
                            ))}
                        </div>
                        <div className={styles.themeInput} contentEditable>
                            <span class="material-symbols-outlined">add</span>
                            직접 설정
                        </div>
                    </div>
                    <div className={styles.toast}>호스트는 주제를 설정해주세요.</div>
                </div>
            </div>
        </>
    )
}