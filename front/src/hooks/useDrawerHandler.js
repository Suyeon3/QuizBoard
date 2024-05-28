import { useEffect, useContext } from 'react';
import useHash from './useHash';
import { DrawerContext } from '../context/PlayerContext';

export default function useDrawerHandler() {
    const { players, setDrawer } = useContext(DrawerContext);
    const { setHash } = useHash();

    useEffect(() => {
        if (players[0]) {
            const drawer = Math.floor(Math.random * players.length);
            setDrawer(drawer);
        }
    }, [players])

    useEffect(() => {
        // drawer가 바뀌면 어떻게 하지?
        // setModal을 하고, 조건문으로 렌더링 다르게
        setHash('inputAnswer');
    }, [drawer])

    return null
}