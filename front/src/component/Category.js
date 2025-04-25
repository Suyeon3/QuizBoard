import socketIo from '../server';
import styles from '../style/category.module.css';
import ThemeLogo from '../img/theme.png'
import { HostContext } from '../context/HostContext';
import { CategoryContext } from '../context/CategoryContext';
import { useContext, useState, useEffect, useRef } from 'react';
import { RoomNameContext } from '../context/RoomNameContext';
import Chat from './Chat';

export default function Category() {
    const themeList = ['음식', '영화', '인물', '장소', '사자성어', '속담'];
    const { roomName } = useContext(RoomNameContext);
    const { isHost } = useContext(HostContext);
    const { theme, setTheme, setCategoryIsOn } = useContext(CategoryContext);
    const [isInputShown, setIsInputShown] = useState(false);
    const [themeInput, setThemeInput] = useState('');
    const isMounted = useRef(false);


    function chooseTheme(e) {
        console.log(e.target.innerText)
        socketIo.emit('setTheme', roomName, e.target.innerText);
    }
    
    function submitThemeInput(e) {
        if (e.keyCode === 13) {
            socketIo.emit('setTheme', roomName, e.target.value);
        }
    }
    
    useEffect(() => {
        socketIo.emit('categoryScreenShare', roomName, {
            themeInput: themeInput,
            theme: theme,
            isInputShown: isInputShown
        })
    }, [themeInput, theme, isInputShown]);
    
    useEffect(() => {
        if (isMounted.current) {
            setCategoryIsOn(false);
            setIsInputShown(false);
            socketIo.emit('categoryOff', roomName, false);
        } else {
            isMounted.current = true;
        }
    }, [theme])
    
    useEffect(() => {
        socketIo.on('categoryScreenShare', async (data) => {
            setThemeInput(data.themeInput);
            setTheme(data.theme);
            setIsInputShown(data.isInputShown);
        });

        socketIo.on('categoryOff', async (category) => {
            console.log(`category: ${category}`)
            setCategoryIsOn(category);
        });

        socketIo.on('setTheme', async (theme) => {
            setTheme(theme);
        })

        return () => {
            socketIo.off('categoryScreenShare');
            socketIo.off('categoryOff');
            socketIo.off('setTheme');
        };
    }, []);



    return (
        <>
            <div className={isHost ? `${styles.enabled}` : `${styles.disabled}`}>
                <div className={styles.container}>
                    <div className={styles.themeLogoWrap}>
                        <img src={ThemeLogo} className={styles.themeLogo} />
                    </div>
                    <div className={styles.themeBox}>
                        <div className={styles.themeListWrap}>
                            {themeList.map((theme, idx) => (
                                <div
                                    key={idx}
                                    className={styles.theme}
                                    onClick={chooseTheme}>
                                    {theme}
                                </div>
                            ))}
                        </div>
                        {isInputShown ? (
                            <input
                                className={styles.themeInput}
                                type='text'
                                onKeyUp={submitThemeInput}
                                placeholder="주제를 입력하세요"
                            />
                        ) : (
                            <div
                                className={styles.themeInputBtn}
                                onClick={setIsInputShown(true)}
                            >직접 설정</div>
                        )}
                    </div>
                    <div className={styles.toast}>호스트는 주제를 설정해주세요.</div>
                </div>
            </div>
            <Chat />
        </>
    )
}