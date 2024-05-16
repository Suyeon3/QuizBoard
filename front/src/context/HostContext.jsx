import { createContext, useState } from 'react';

export const HostContext = createContext();

export function HostProvider({children}) {
    const [isHost, setIsHost] = useState(false);

    return (
        <HostContext.Provider value={{isHost, setIsHost}}>
            {children}
        </HostContext.Provider>
    )
}