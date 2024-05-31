import { useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function useHash() {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentHash, setCurrentHash] = useState(location.hash);

    useEffect(() => {
        setCurrentHash(location.hash);
    }, [location.hash]);

    function setHash(hash) {
        navigate(`#${hash}`);
    }

    function removeHash() {
        navigate(location.pathname);
    }

    //Todo: HashElement 이름 바꾸기
    const HashElement = ({children}) => {
        return <>{currentHash==='#leaveModal' &&  children}</>
    };

    const HashElement2 = ({children}) => {
        return <>{currentHash==='#inputAnswer' && children}</>
    };

    const OpenAnswerElement = ({children}) => {
        return <>{currentHash==='#openAnswer' && children}</>
    };

    return { setHash, removeHash, HashElement, HashElement2, OpenAnswerElement}
}