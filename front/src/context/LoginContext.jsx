import { createContext, useState } from 'react';

export const LoginContext = createContext();

export function LoginProvider({children}) {
    const [isLogin, setIsLogin] = useState(false);
    const [userId, setUserId] = useState('');   //id
    const [userName, setUserName] = useState('');   //닉네임

    function handleLoginState() {
        setIsLogin(!isLogin);
    }
    function handleUserId(userId) {
        setUserId(userId);
    };
    function handleUserName(userName) {
        setUserName(userName);
    };

    return (
        <LoginContext.Provider value={ {isLogin, handleLoginState, userId, handleUserId, userName, handleUserName} }>
            {children}
        </LoginContext.Provider>
    )
}