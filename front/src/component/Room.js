import socketIo from "../server";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Room() {
    const { state } = useLocation()
    const roomName = state?.roomName;
    const userId = state?.userId;
    const host = state?.host;

    useEffect(() => {
        console.log(`첫 렌더링됨 -> roomName:${roomName}`);
        return () => {
            console.log(`${roomName}에서 나감`);
            if (host) {
                if (host !== userId) {
                    socketIo.emit('guestLeaveRoom', roomName);
                }
                socketIo.emit('hostLeaveRoom', roomName);
            }
            else {
                socketIo.emit('guestLeaveRoom', roomName);
            }
        }
    }, [])

    useEffect(() => {
        console.log(`roomName 렌더링 -> ${roomName}에 입장`);
        return () => {
            console.log(`roomNameSet: ${roomName}`);
        }
    }, [roomName])


    return (
        <div>

        </div>
    );
}