import { useEffect, useState, useRef } from 'react';
import styles from '../style/canvas.module.css';
import Brush from '../img/brush.png';
import Eraser from '../img/eraser.png';
import Reset from '../img/reset.png';

export default function PlayingGame(props) {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    // const colorRef = useRef('black');   
    const [painting, setPainting] = useState(false);
    const [currentColor, setCurrentColor] = useState('black');

    const {socket, roomName, host, userId} = props;

    useEffect(() => {
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d');    // 여기가 초기화
        // Todo: virtual screen
        function handleSize() {
            //재조정된 width, height
            const { width, height } = canvas.getBoundingClientRect();
            const newCanvas = document.createElement('canvas');
            newCanvas.width = width;
            newCanvas.height = height;
            const newCtx = newCanvas.getContext('2d');
            newCtx.drawImage(canvas, 0, 0); // 기존 canvas 복사

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.drawImage(newCanvas, 0, 0); // 복사본 초기화된 ctx에 그리기

            ctx.lineJoin = 'round';
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = currentColor;
            ctxRef.current = ctx;
        }
        
        handleSize();
        
        window.addEventListener('resize', handleSize);

        return () => {
            window.removeEventListener('resize', handleSize);
        }
    }, [props]);

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

    function setColor(e) {
        const newColor = e.target.getAttribute('data-color');
        setCurrentColor(newColor);
    }

    useEffect(() => {
        socket.emit('changeColor', roomName, currentColor);
    }, [currentColor])

    socket.on('changeColor', (newColor) => {
        const ctx = ctxRef.current;
        ctx.strokeStyle = newColor;
        ctx.lineWidth = 2.5;
        ctxRef.current = ctx;
    })

    function setEraser() {
        const ctx = ctxRef.current;
        const color = '#F2F7FF';
        ctx.strokeStyle = color;
        ctx.lineWidth = 7;
        ctxRef.current = ctx;
    }

    function setReset() {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();
        const ctx = ctxRef.current;
        ctx.fillStyle = '#F2F7FF'
        ctx.fillRect(0, 0, width, height);
    }

    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.tools}>
                    <img id={styles.tool} data-tool='brush' src={Brush} />
                    <img id={styles.tool} data-tool='eraser' src={Eraser} onClick={setEraser}/>
                    <img id={styles.tool} data-tool='reset' src={Reset} onClick={setReset}/>
                </div>
                <div className={styles.colors} onClick={setColor}>
                    <div id={styles.color} data-color='black'></div>
                    <div id={styles.color} data-color='red'></div>
                    <div id={styles.color} data-color='orange'></div>
                    <div id={styles.color} data-color='yellow'></div>
                    <div id={styles.color} data-color='green'></div>
                    <div id={styles.color} data-color='blue'></div>
                    <div id={styles.color} data-color='purple'></div>
                    <div id={styles.color} data-color='white'></div>
                </div>
            </div>
            <div className={styles.canvasWrap}>
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