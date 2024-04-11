import socketIo from "../server";

export default function BeforeGame(props) {
    return (
        <div>
            <div onClick={props.handleStartGame}>게임 시작</div>
        </div>
    )
}