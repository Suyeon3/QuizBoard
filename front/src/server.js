import {io} from 'socket.io-client';
const socketIo = io('http://127.0.0.1:5001');
export default socketIo;