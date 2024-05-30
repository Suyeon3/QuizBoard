import socketIo from '../server';
import { PlayerContext } from '../context/PlayerContext';
import { useContext } from "react";
import { HostContext } from '../context/HostContext';
import { RoomNameContext } from '../context/RoomNameContext';

export default function useSelectDrawer() {

    const { isHost } = useContext(HostContext);
    const { roomName } = useContext(RoomNameContext);
    const { players } = useContext(PlayerContext);

    // drawer 정하기
    function replaceDrawer() {
        if (players[0]) {
            console.log('selectDrawer 이벤트 서버에 보냄');
            if (isHost) socketIo.emit('selectDrawer', roomName, players);
        }
    }


    return { replaceDrawer };
}