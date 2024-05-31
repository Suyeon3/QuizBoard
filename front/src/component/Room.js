import socketIo from "../server";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from 'react';
import BeforeGame from './BeforeGame';
import PlayingGame from "./PlayingGame";
import { RoomNameContext } from "../context/RoomNameContext";
import { LoginContext } from "../context/LoginContext";
import { HostContext } from '../context/HostContext';
import { PlayerProvider } from "../context/PlayerContext";
import { QuizProvider } from "../context/QuizContext";
import { PlayGameStateContext } from "../context/PlayGameStateContext";

export default function Room() {
    const navigate = useNavigate();
    const { roomName } = useContext(RoomNameContext);
    const { userName } = useContext(LoginContext);
    const { isHost, setIsHost } = useContext(HostContext);
    const { playGame, setPlayGame } = useContext(PlayGameStateContext);
    const { state } = useLocation();
    const isMounted = useRef(false);

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
            console.log(`playGame(${playGame}) emit`);
            socketIo.emit('handlePlayGame', roomName, playGame);
        } else {
            isMounted.current = true;
        }
    }, [playGame]);

    useEffect(() => {

        const synchroPlayGame = (playGameState) => {
            console.log(`synchroPlayGame(playGameState: (${playGameState}))`);
            setPlayGame(playGameState);
        }
        //이벤트 등록
        socketIo.on('handlePlayGame', synchroPlayGame);
        return () => {
            //이벤트 해제
            console.log('이벤트해제');
            socketIo.off('handlePlayGame', synchroPlayGame);
        }

    }, []);

    return (
        <div>
            <PlayerProvider>
            <QuizProvider>
                {playGame ?
                    <PlayingGame
                    />
                    :
                    <BeforeGame />
                }
            </QuizProvider>
            </PlayerProvider>
        </div>
    );
}