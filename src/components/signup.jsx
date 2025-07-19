import { useState } from 'react'
import './sign.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState('password');

    const signupFunc = async () => {
        const newUser = {
            email,
            password
        };

        try {
            const res = await fetch('http://localhost:3000/friendi/signup', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(newUser)
            });

            const result = await res.json();

            if(result.success === true) {
                navigate('/login');

                alert(result.message);

                window.location.reload();
            } else if(result.success === false) {
                alert(result.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }


    return (
        <div className='sign-page' style={{width : "fit-content", margin : "0 auto"}}>
            <div style={{width : "fit-content", margin : "0 auto"}} className="friendi-txt">
                Friend!
            </div>
            <div className="signup-page">
                <div className="the-uer-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                <div className="txt">
                    Sign Up
                </div>

                <div className="signup-email bb">
                    <input type='email' placeholder="Email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                </div>

                <div className="signup-password bb">
                    <input type={showPassword} placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </div>

                <div className="show-password">
                    <input type="checkbox" onClick={() => {
                        setShowPassword((s) => s === '' ? 'password' : '')
                    }}/> <div>Show password</div>
                </div>

                <div className="signup-btn hover">
                    <button onClick={()=> {
                        signupFunc();
                    }}>Sign up</button>
                </div>

                <div className="sign-othwewise">
                    Already have an account? <Link className='Link' to={'/login'}><span>Log in.</span></Link>
                </div>
            </div>
        </div>
    )
}