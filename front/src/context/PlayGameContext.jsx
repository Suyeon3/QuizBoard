import { createContext } from 'react';

export const PlayGameContext = createContext();

export function PlayGameProvider({handlePlayGame, children}) {

    return (
        <PlayGameContext.Provider value={ handlePlayGame }>
            {children}
        </PlayGameContext.Provider>
    )
}