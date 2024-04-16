import { useEffect, useState, useRef } from 'react';
import styles from '../style/canvas.module.css';

export default function PlayingGame(props) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [painting, setPainting] = useState(false);

    const {socket, roomName, host, userId} = props;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        function handleSize() {
            const { width, height } = canvas.getBoundingClientRect();
            const newCanvas = document.createElement('canvas');
            newCanvas.width = width;
            newCanvas.height = height;
            const newCtx = newCanvas.getContext('2d');
            newCtx.drawImage(canvas, 0, 0);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.drawImage(newCanvas, 0, 0);
        }
        
        handleSize();
        
        window.addEventListener('resize', handleSize);
        
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'black';
        ctxRef.current = ctx;

        return () => {
            window.removeEventListener('resize', handleSize);
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
            ctx.moveTo(mouseX, mouseY);;
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
            <div>
                <canvas
                    ref={canvasRef}
                    className={styles.canvas}
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