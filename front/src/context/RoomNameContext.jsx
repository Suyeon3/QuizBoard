import { createContext, useState } from 'react';

export const RoomNameContext = createContext();

export function RoomNameProvider({children}) {
    const [roomName, setRoomName] = useState('');
    function handleRoomName(roomName) {
        setRoomName(roomName);
    };

    return (
        <RoomNameContext.Provider value={{roomName, handleRoomName}}>
            {children}
        </RoomNameContext.Provider>
    )
}