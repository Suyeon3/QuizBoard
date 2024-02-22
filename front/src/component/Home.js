import {Link} from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Link to='/login'><button>로그인</button></Link>
        </div>
    )
    
}