import socketIo from "../server";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Room() {
    const { state } = useLocation()
    const roomName = state?.roomName;
    // const [roomName, setRoomName] = useState(state?.roomName);

    useEffect(() => {
        console.log(`첫 렌더링됨 -> roomName:${roomName}`);
        return () => {
            console.log(`${roomName}에서 나감`);
            socketIo.emit('leaveRoom', roomName);
        }
    },[])

    useEffect(() => {
        console.log(`roomName 렌더링 -> ${roomName}에 입장`);
        return () => {
            console.log(`roomNameSet: ${roomName}`);
        }
    }, [roomName])


    // 얘가 젤 먼저 실행이 됨, 렌더링되기 전에! 따라서 렌더링되면 다시 ''가 된다.
    /*
    socketIo.on('sendRoomName', (roomName) => {
        try {
            console.log(`sendRoomName 실행됨 -> roomName: ${roomName}`);
            setRoomName(roomName);
        } catch (error) {
            console.error(error);
        }
    })
    */

    return (
        <div>

        </div>
    );
}