// import { history } from '../history';
import { useContext, useEffect } from 'react';
import { history } from '../history';
import useHash from './useHash';
import useLeaveRoom from '../hooks/useLeaveRoom';
import { PlayGameStateContext } from '../context/PlayGameStateContext';

export default function useBackHandler() {
    const { playGame } = useContext(PlayGameStateContext);
    const { setHash } = useHash();
    const leaveRoom = useLeaveRoom();

    useEffect(() => {

        const listenBack = () => {

            if (playGame) {
                setHash('leaveModal');
            } else {
                leaveRoom();
            }
        };

        const unlistenBack = history.listen(({ action }) => {
            if (action === 'POP') listenBack();
        });

        return unlistenBack;
    }, [setHash]);

    return null;
}