// import { history } from '../history';
import { useEffect } from 'react';
import { history } from '../history';
import useHash from './useHash';

export default function useBackHandler() {
    const { setHash } = useHash();

    useEffect(() => {;

        const listenBack = () => {
            setHash('modal');
        };

        const unlistenBack = history.listen(({ action }) => {
            if (action === 'POP') listenBack();
        });

        return unlistenBack;
    }, [setHash]);

    return null;
}