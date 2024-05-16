// import { history } from '../history';
import { useContext, useEffect } from 'react';
import { history } from '../history';
import useHash from './useHash';
import useLeaveRoom from '../hooks/useLeaveRoom';
import { HostContext } from '../context/HostContext';

export default function useBackHandler(isGamePlaying) {
    const { isHost } = useContext(HostContext);
    const { setHash } = useHash();
    const leaveRoom = useLeaveRoom();

    useEffect(() => {

        const listenBack = () => {

            if (isGamePlaying) {
                setHash('modal');
            } else {
                leaveRoom(isHost);
            }
        };

        const unlistenBack = history.listen(({ action }) => {
            if (action === 'POP') listenBack();
        });

        return unlistenBack;
    }, [setHash]);

    return null;
}