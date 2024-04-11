import { useEffect, useState, useRef } from 'react';

export default function PlayingGame(props) {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [painting, setPainting] = useState(false);

    const socket = props.socket;
    const roomName = props.roomName;
    const host = props.host;
    const userId = props.userId;

    useEffect(() => {
        const canvas = canvasRef.current;
        const width = window.innerWidth - 20;
        const height = window.innerHeight - 120;
        canvas.width = width;
        canvas.height = height;
        canvas.style.border = '3px double';
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'black';
        ctxRef.current = ctx;

        return() => {
            if (host) {
                if (host !== userId) {
                    socket.emit('guestLeaveRoom', roomName);
                }
                socket.emit('hostLeaveRoom', roomName);
            }
            else {
                socket.emit('guestLeaveRoom', roomName);
            }
        }
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('stopDraw', (mouseX, mouseY) => {
            const ctx = ctxRef.current;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
        });
        socket.on('startDraw', (mouseX, mouseY) => {
            const ctx = ctxRef.current;
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
        });

        return () => {
            socket.off('draw');
        };

    }, [socket, painting]);

    function drawFn(e) {
        const mouseX = e.nativeEvent.offsetX;
        const mouseY = e.nativeEvent.offsetY;
        // painting 상태
        if (!painting) {
            socket.emit('stopDraw', roomName, { mouseX, mouseY });
        } else {
            socket.emit('startDraw', roomName, { mouseX, mouseY });
        }
    };

    return (
        <div>
            <div >
                <canvas
                    ref={canvasRef}
                    onMouseDown={() => setPainting(true)}
                    onMouseUp={() => setPainting(false)}
                    onMouseMove={e => drawFn(e)}
                    onMouseLeave={() => setPainting(false)}
                >
                </canvas>
            </div>
        </div>
    );
}