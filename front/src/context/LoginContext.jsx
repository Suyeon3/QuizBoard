import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const LoginContext = createContext();

export function LoginProvider({children}) {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.state?.isLogin);
    function handleLogout() {
        setIsLogin(!isLogin);
    }

    return (
        <LoginContext.Provider value={ {isLogin, handleLogout} }>
            {children}
        </LoginContext.Provider>
    )
}