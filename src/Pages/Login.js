import React, {useState} from 'react';
import './css/Login.css';

import Register from '../Components/Register';
import SignIn from '../Components/SignIn';

function Login() {

    const [isNewUser, setIsNewUser] = useState(false)

    const toggleIsNewUser = () => {
        setIsNewUser(!isNewUser);
    }

    return (
        <div className="loginPage">
            <p className="loginPage-title">{isNewUser ? "Sign Up" : "Log In"}</p>
            <div className="loginPage-box">
                {
                    isNewUser ? <Register /> : <SignIn />
                }
                <div className='bottom-hyperlink' onClick={toggleIsNewUser}>
                    {isNewUser ? "Already registered? Please login." : "Are you a new user ? Please Register."}
                </div>
            </div>
            
        </div>
    )
}

export default Login;