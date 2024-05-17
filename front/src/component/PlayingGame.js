import { useEffect, useContext, useRef } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import useBackHandler from '../hooks/useBackHandler';
import Category from './Category';
import Canvas from './Canvas';

export default function PlayingGame(props) {

    const { categoryIsOn, setCategoryIsOn } = useContext(CategoryContext);
    const { playGame } = props;
    const isMounted = useRef(false);

    useBackHandler(playGame);

    useEffect(() => {
        if (!categoryIsOn) {
           setCategoryIsOn(true);
           isMounted.current = true;
        }
    }, [isMounted.current]);

    
    if (categoryIsOn) {
        return <Category />
    }
    else {
        return <Canvas />
    }
}