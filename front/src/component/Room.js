import socketIo from "../server";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import BeforeGame from './BeforeGame';
import PlayingGame from "./PlayingGame";

export default function Room() {

    const { state } = useLocation()
    const roomName = state?.roomName;
    const userId = state?.userId;
    const host = state?.host;

    const [startGame, setStartGame] = useState(false);

    useEffect(() => {
        console.log(`첫 렌더링됨 -> roomName:${roomName}`);
        return () => {
            console.log(`${roomName}에서 나감`);
            if (host) {
                socketIo.emit('hostLeaveRoom', roomName);
            }
            else {
                socketIo.emit('guestLeaveRoom', roomName);
            }
        }
    }, []);

    useEffect(() => {
        console.log(`roomName 렌더링 -> ${roomName}에 입장`);
        return () => {
            console.log(`roomNameSet: ${roomName}`);
        }
    }, [roomName]);

    useEffect(() => {
        if (startGame) {
            socketIo.emit('startGame', roomName, startGame);
        }
    }, [startGame]);

    function handleStartGame() {
        if(host) {
            setStartGame(true);
        }
        else {
            alert('호스트만 게임을 시작할 수 있습니다.');
        }
    }

    socketIo.on('startGame', (startGameState) => {
        setStartGame(startGameState);
    })

    return (
        <div>
            {startGame ?
                <PlayingGame
                    socket={socketIo}
                    roomName={roomName}
                    host={host}
                    userId={userId}
                />
                :
                <BeforeGame
                    socket={socketIo}
                    roomName={roomName}
                    host={host}
                    userId={userId}
                    handleStartGame={handleStartGame}
                />
            }
        </div>
    );
}