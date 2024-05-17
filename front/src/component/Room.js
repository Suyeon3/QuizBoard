import socketIo from "../server";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from 'react';
import BeforeGame from './BeforeGame';
import PlayingGame from "./PlayingGame";
import { RoomNameContext } from "../context/RoomNameContext";
import { PlayGameProvider } from "../context/PlayGameContext";
import { CategoryProvider } from "../context/CategoryContext";
import { LoginContext } from "../context/LoginContext";
import { HostContext } from '../context/HostContext';
import useLeaveRoom from '../hooks/useLeaveRoom';

export default function Room() {
    const navigate = useNavigate();
    const [playGame, setPlayGame] = useState(false);
    const { roomName } = useContext(RoomNameContext);
    const { userName } = useContext(LoginContext);
    const { isHost, setIsHost } = useContext(HostContext);
    const { state } = useLocation();
    const isMounted = useRef(false);
    const leaveRoom = useLeaveRoom();

    socketIo.on('deleteRoom', () => {
        navigate('/');
    })

    useEffect(() => {
        if (state?.isHost) {
            setIsHost(true);
        }
    }, [isHost])

    useEffect(() => {
        console.log(`userName: ${userName}`);
    }, [userName]);

    useEffect(() => {
        console.log(`roomName 렌더링 -> ${roomName}에 입장`);
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
            if (isHost) {
                setPlayGame(!playGame);
            }
            else {
                leaveRoom(isHost);
                navigate('/');
            }
        }
        // startGame
        // host는 PlayingGame으로 설정(guest들도 함께), guset는 결정권 없음
        else {
            if(isHost) {
                setPlayGame(!playGame);
            }
            else {
                alert('호스트만 게임을 시작할 수 있습니다.');
            }
        }
    };

    // host가 설정한 상태로(playGame/ endGame) 이동
    socketIo.on('handlePlayGame', (playGameState) => {
        setPlayGame(playGameState);
    })



    return (
        <div>
            <CategoryProvider>            
            <PlayGameProvider handlePlayGame={handlePlayGame}>
                {playGame ?
                    <PlayingGame
                        socket={socketIo}
                        playGame ={playGame}
                    />
                    :
                    <BeforeGame
                        playGame={playGame}
                    />
                }
            </PlayGameProvider>
            </CategoryProvider>

        </div>
    );
}