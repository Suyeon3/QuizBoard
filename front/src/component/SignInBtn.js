import { Link, useLocation } from 'react-router-dom';

export default function SignInBtn() {
    return (
        <div>
            <Link to='./signIn'><button>회원가입</button></Link>
        </div>
    )
}