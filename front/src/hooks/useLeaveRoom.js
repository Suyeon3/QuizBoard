import socketIo from "../server";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomNameContext } from "../context/RoomNameContext";
import { LoginContext } from "../context/LoginContext";
import { HostContext } from "../context/HostContext";

export default function useLeaveRoom() {
    const { roomName, handleRoomName } = useContext(RoomNameContext);
    const { handleUserName } = useContext(LoginContext);
    const { isHost } = useContext(HostContext);
    const navigate = useNavigate();

    function leaveRoom() {

        // host 나가면 방 없어짐, guest 나가면 방 그대로임 
        console.log(`${roomName}에서 나감`);
        if (isHost) {
            socketIo.emit('allLeaveRoom', roomName);   // allLeaveRoom
        }
        else {
            socketIo.emit('guestLeaveRoom', roomName);
            handleUserName('');
            navigate('/');
        }
        handleRoomName('');
    }

    return leaveRoom;
}

