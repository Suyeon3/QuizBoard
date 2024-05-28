import { useEffect, useContext, useRef } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import { RoomNameContext } from '../context/RoomNameContext';
import { PlayerContext } from '../context/PlayerContext';
import useBackHandler from '../hooks/useBackHandler';
import Category from './Category';
import Canvas from './Canvas';
import LeaveGameModal from './LeaveGameModal';

export default function PlayingGame() {
    //Todo: context, 커스텀 훅으로 로직 만들기
    const { categoryIsOn, setCategoryIsOn } = useContext(CategoryContext);
    const { roomName } = useContext(RoomNameContext);
    const { setPlayers } = useContext(PlayerContext);

    useBackHandler();

    useEffect(() => {
        if (!categoryIsOn) {
           setCategoryIsOn(true);
        }
    }, []);

    useEffect(() => {
        function getPlayers() {
            fetch('http://localhost:5001/players', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({roomName})
            })
            .then((res) => res.json())
            .then((json) => {
                if (json.players) {
                    setPlayers(json.players);
                } 
                else {
                    console.log(`players: ${json.players}???`);
                }
            })
        };
        getPlayers();
    }, [])


    return (
        <>
            <LeaveGameModal />
            {categoryIsOn ? <Category/> : <Canvas />}
        </>
    )
}