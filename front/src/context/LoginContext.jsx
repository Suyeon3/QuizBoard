import { createContext, useState } from 'react';

export const LoginContext = createContext();

export function LoginProvider({children}) {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');
    function handleLoginState() {
        setIsLogin(!isLogin);
    }
    function handleUserId(userId) {
        setUserId(userId);
    };

    return (
        <LoginContext.Provider value={ {isLogin, handleLoginState, userId, handleUserId} }>
            {children}
        </LoginContext.Provider>
    )
}