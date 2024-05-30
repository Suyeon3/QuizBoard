import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({children}) {
    const [categoryIsOn, setCategoryIsOn] = useState(false);
    const [theme, setTheme] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <CategoryContext.Provider value={{categoryIsOn, setCategoryIsOn, theme, setTheme, answer, setAnswer}}>
            {children}
        </CategoryContext.Provider>
    )
}