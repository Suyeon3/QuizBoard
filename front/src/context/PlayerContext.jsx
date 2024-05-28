import { createContext, useState } from "react";

export const PlayerContext = createContext();

export function PlayerProvider({children}) {
    const [players, setPlayers] = useState([]);
    const [drawer, setDrawer] = useState('');

    return (
        <PlayerContext.Provider value={{players, setPlayers, drawer, setDrawer}}>
            {children}
        </PlayerContext.Provider>
    )

}
