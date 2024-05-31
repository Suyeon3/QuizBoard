import { useContext, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";
import styles from '../style/theme.module.css';

export default function Theme() {
    const { theme } = useContext(CategoryContext);

    useEffect(() => {
        console.log(theme);
    }, [theme])

    return (
        <div className={styles.theme}>{theme}</div>
    )
}