import socketIo from "../server";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';
import BeforeGame from './BeforeGame';
import PlayingGame from "./PlayingGame";

export default function Room() {

    const navigate = useNavigate();
    const { state } = useLocation()
    const roomName = state?.roomName;
    const userId = state?.userId;
    const host = state?.host;
    const isMounted = useRef(false);

    const [playGame, setPlayGame] = useState(false);

    function leaveRoom () {
        // host 나가면 방 없어짐, guest 나가면 방 그대로임 
        console.log(`${roomName}에서 나감`);
        if (host) {
            socketIo.emit('hostLeaveRoom', roomName);
        }
        else {
            socketIo.emit('guestLeaveRoom', roomName);
        }
    }

    useEffect(() => {
        console.log(`첫 렌더링됨 -> roomName:${roomName}`);
        return () => {
            leaveRoom();
        }
    }, []);

    useEffect(() => {
        console.log(`roomName 렌더링 -> ${roomName}에 입장`);
        return () => {
            console.log(`roomNameSet: ${roomName}`);
        }
    }, [roomName]);

    useEffect(() => {
        if (isMounted.current) {
            socketIo.emit('handlePlayGame', roomName, playGame);
        } else {
            isMounted.current = true;
        }
    }, [playGame]);

    function handlePlayGame() {
        // endGame
        // host는 BeforGame으로 설정(guest들도 함께), guest는 완전 나가기
        if(playGame) {
            if (host) {
                setPlayGame(!playGame);
            }
            else {
                leaveRoom();
                navigate('/', {
                    state: {
                        roomName: roomName,
                    }
                })
            }
        }
        // startGame
        // host는 PlayingGame으로 설정(guest들도 함께), guset는 결정권 없음
        else {
            if(host) {
                setPlayGame(!playGame);
            }
            else {
                alert('호스트만 게임을 시작할 수 있습니다.');
            }
        }
    }

    // host가 설정한 상태로(playGame/ endGame) 이동
    socketIo.on('handlePlayGame', (playGameState) => {
        setPlayGame(playGameState);
    })

    return (
        <div>
            {playGame ?
                <PlayingGame
                    socket={socketIo}
                    roomName={roomName}
                    host={host}
                    userId={userId}
                    handlePlayGame={handlePlayGame}
                />
                :
                <BeforeGame
                    socket={socketIo}
                    roomName={roomName}
                    host={host}
                    userId={userId}
                    handlePlayGame={handlePlayGame}
                />
            }
        </div>
    );
}