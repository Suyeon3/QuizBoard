import socketIo from "../server";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomNameContext } from "../context/RoomNameContext";
import { LoginContext } from "../context/LoginContext";
import { HostContext } from "../context/HostContext";
import { CategoryContext } from "../context/CategoryContext";

export default function useLeaveRoom() {
    const { roomName, handleRoomName } = useContext(RoomNameContext);
    const { handleUserName } = useContext(LoginContext);
    const { isHost } = useContext(HostContext);
    const { categoryIsOn, setCategoryIsOn } = useContext(CategoryContext)
    const navigate = useNavigate();

    function leaveRoom() {

        // host 나가면 방 없어짐, guest 나가면 방 그대로임 
        if (isHost) {
            socketIo.emit('allLeaveRoom', roomName);  // allLeaveRoom
            if (categoryIsOn) setCategoryIsOn(false);
        }
        else {
            navigate('/');
            socketIo.emit('guestLeaveRoom', roomName);
            console.log('guestleaveRoom 실행');
            handleUserName('');
        }
        handleRoomName('');
        console.log(`${roomName}에서 나감`);
    }

    return leaveRoom;
}

