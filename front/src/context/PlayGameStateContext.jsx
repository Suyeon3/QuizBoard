import { createContext, useState } from 'react';

export const PlayGameStateContext = createContext();

export function PlayGameStateProvider({children}) {
    const [playGame, setPlayGame] = useState(false);

    return (
        <PlayGameStateContext.Provider value={{playGame, setPlayGame}}>
            {children}
        </PlayGameStateContext.Provider>
    )
}