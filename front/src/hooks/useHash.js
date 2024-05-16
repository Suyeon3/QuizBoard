import { useNavigate, useLocation} from 'react-router-dom';

export default function useHash() {
    const navigate = useNavigate();
    const location = useLocation();

    const hashString = location.hash;
    const hashArray = hashString ? hashString.split('#') : [];

    function setHash(hash) {
        navigate(`#${hash}`);
    }

    function removeHash() {
        navigate(location.pathname);
    }

    function HashElement({children}) {
        return <>{hashString && hashArray.map(() => children)}</>
    }

    return { setHash, removeHash, HashElement}
}