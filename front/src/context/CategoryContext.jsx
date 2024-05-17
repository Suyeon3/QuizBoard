import { createContext, useContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({children}) {
    const [categoryIsOn, setCategoryIsOn] = useState(false);
    const [theme, setTheme] = useState('');

    return (
        <CategoryContext.Provider value={{categoryIsOn, setCategoryIsOn, theme, setTheme}}>
            {children}
        </CategoryContext.Provider>
    )
}