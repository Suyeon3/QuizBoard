import socketIo from "../server";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from 'react';
import styles from '../style/canvas.module.css';
import Brush from '../img/brush.png';
import Eraser from '../img/eraser.png';
import Reset from '../img/reset.png';
import { RoomNameContext } from '../context/RoomNameContext';
import InputAnswer from "./InputAnswer";
import useSelectDrawer from "../hooks/useSelectDrawer";
import { PlayerContext } from "../context/PlayerContext";
import Timer from './Timer';
import Chat from './Chat';
import useHash from "../hooks/useHash";
import OpenAnswer from "./OpenAnswer";
import ImageDownload from "./ImageDownload";
import Theme from './Theme';

export default function Canvas() {
    const socket = socketIo;
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [painting, setPainting] = useState(false);
    const [currentColor, setCurrentColor] = useState('black');
    const { roomName } = useContext(RoomNameContext);

    const location = useLocation();

    const { setHash } = useHash();
    const { drawer, setDrawer, players } = useContext(PlayerContext);
    const { replaceDrawer } = useSelectDrawer();
    const isMounted = useRef(false);
    const [forceUpdate, setForceUpdate] = useState(false);

    // 첫 마운트시 drawer 설정 및 'selectDrawer' 이벤트 등록
    useEffect(() => {
        replaceDrawer();

        socketIo.on('selectDrawer', async (drawer) => {
            setDrawer(players[drawer]);
            setForceUpdate((prev) => !prev) //강제로 업데이트 트리거
        })

        return () => socketIo.off('selectDrawer');
    }, []);

    // drawer 바뀔때마다 제시어 입력창 열기
    useEffect(() => {
        if (isMounted.current) {
            setHash('inputAnswer');
            socket.emit('reset', roomName, '#F2F7FF');
        } else {
            isMounted.current = true;
        }
    }, [drawer, forceUpdate]);

    // 그림그리기
    // Todo: Drawer만 그릴 수 있도록 제한
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
            ctx.strokeStyle = currentColor; //Todo: currentColor도 broadCast되도록(근데 안 해도 될지도??)
            ctxRef.current = ctx;
        }

        handleSize();

        window.addEventListener('resize', handleSize);

        return () => {
            window.removeEventListener('resize', handleSize);
        }
    }, [socket]);

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

    useEffect(() => {
        socket.emit('changeColor', roomName, currentColor);
    }, [currentColor]);

    useEffect(() => {

        const reset = (resetFillColor) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const { width, height } = canvas.getBoundingClientRect();
            const ctx = ctxRef.current;
            if (!ctx) return;

            ctx.fillStyle = resetFillColor;
            ctx.fillRect(0, 0, width, height);

        }
        socket.on('reset', reset);

        return () => {
            socket.off('reset', reset);
        }
    }, [socket])

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

    socket.on('changeColor', (newColor) => {
        const ctx = ctxRef.current;
        ctx.strokeStyle = newColor;
        ctx.lineWidth = 2.5;
        ctxRef.current = ctx;
    })

    function setEraser() {
        const eraserColor = '#F2F7FF';
        setCurrentColor(eraserColor);
    }

    function setReset() {
        const resetFillColor = '#F2F7FF';
        socket.emit('reset', roomName, resetFillColor);
    }

    return (
        <div>
            <InputAnswer />
            <OpenAnswer />
            <Theme />
            <Timer />
            <ImageDownload canvas={canvasRef.current}/>
            <div
                className={styles.sidebar}
                style={{visibility: drawer === socket.id ? 'visible' : 'hidden'}}
            >
                <div className={styles.tools}>
                    <img id={styles.tool} data-tool='brush' src={Brush} />
                    <img id={styles.tool} data-tool='eraser' src={Eraser} onClick={setEraser} />
                    <img id={styles.tool} data-tool='reset' src={Reset} onClick={setReset} />
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
            <div className={drawer === socket.id ? `${styles.canvas_enabled}` : `${styles.canvas_disabled}`}>
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
            {location.hash !== '#inputAnswer' && <Chat />}
        </div>
    );
}

