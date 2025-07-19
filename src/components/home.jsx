import { useState } from 'react'
import './home.css'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Home({getFriends}) {
    const [menu, setMenu] = useState(false);
    const [retrieve, setRetrieve] = useState(false);
    const [id, setId] = useState('');
    const [retrievedDetails, setRetrievedDetails] = useState(null);
    const [fileSaved, setFileSaved] = useState(true);

    
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate = useNavigate();

    console.log(retrievedDetails)
    
    useEffect(() => {

        if(token === null) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const home = async () => {
            try {
                const req = await fetch(`https://friendi-be.onrender.com/friendi/home`, {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const res = await req.json();

                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }

        home();
    }, []);

    const retrieveDetailsFunc = async () => {
        try {
            const res = await fetch('https://friendi-be.onrender.com/friendi/retrieve', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({id})
            });

            const result = await res.json();
            setRetrievedDetails(result.details);
            
        } catch (error) {
            console.log(error);
        }
    };

    const saveToFolder = async () => {
        const res = await fetch('https://friendi-be.onrender.com/friendi/savefile', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body : JSON.stringify(retrievedDetails)
        });

        const result = await res.json();
        console.log(result.file);

        alert(`${result.message}`)
    }

    return (
        <div className="home-page">
            {menu && <div className="menu-nav">
                <div className="menu-profile">
                    <div onClick={() => {
                        navigate('/profile')
                    }}>Profile</div>
                </div>

                <div className="menu-my-friends">
                    <div onClick={() => {
                        navigate('/folder')

                        getFriends();
                    }}>My Friends</div>
                </div>

                <div className="menu-help">
                    <div>Help</div>
                </div>

                <div id="menu-logout">
                    <div onClick={() => {
                        navigate('/login');

                        localStorage.clear();
                        alert(`You have logged out, please log in !`)
                    }}>Log out</div>
                </div>
            </div>}

            <div className="header">
                {!menu && <div className="menu">
                    <svg onClick={() => {
                        setMenu((m) => !m);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M4 5L20 5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M4 12L20 12" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M4 19L20 19" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>}

                {menu && <div className="menu">
                    <svg onClick={() => {
                        setMenu((m) => !m);
                    }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M18 6L6.00081 17.9992M17.9992 18L6 6.00085" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>}

                <div style={{color : "white"}} className="friendi-txt-home">
                    Friend!
                </div>

                <Link to={'/profile'}><div className="profile-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#ffffff" stroke-width="1.5"></path>
                        <path d="M14 14H10C7.23858 14 5 16.2386 5 19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19C19 16.2386 16.7614 14 14 14Z" stroke="#ffffff" stroke-width="1.5" stroke-linejoin="round"></path>
                    </svg>
                </div></Link>
            </div>

            {!retrieve && <div className="add-friend-field">
                <div className="add-friend-btn hover">
                    <button onClick={() => {
                        setRetrieve(r => !r);
                        setRetrievedDetails(null);
                        setFileSaved(true);
                    }}>Add a friend</button>
                </div>
            </div>}

            {/* POP-UP */}

            {retrieve && <div className="retrieve-friend-details">
                <div className="the-uer-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div>
                <div className="r-f-d-text">
                    Retrieve Friend's Details
                </div>

                <div className="r-f-d-password bb">
                    <input type="password" placeholder="Enter Friend's ID" value={id} onChange={(e) => {
                        setId(e.target.value);
                    }}/>
                </div>

                <div className="r-f-d-btn hover">
                    <button onClick={() => {
                        setRetrieve(r => !r);
                        retrieveDetailsFunc();
                    }}>Retrieve</button>
                </div>
            </div>}

            {fileSaved && retrievedDetails && <div className="show-retrieved-results">
                <div className="r-f-d-text fd">
                    Friend's Details
                </div>

                <div className="friend-details">
                    {retrievedDetails.name && <div className="friend-name">
                        Name: {retrievedDetails.name}
                    </div>}

                    {retrievedDetails.email && <div className="friend-email">
                        Email: {retrievedDetails.email}
                    </div>}

                    {retrievedDetails.phone && <div className="friend-phone">
                        Phone: {retrievedDetails.phone}
                    </div>}

                    {retrievedDetails.github && <div className="friend-github">
                        GitHub: {retrievedDetails.github}
                    </div>}

                    {retrievedDetails.linkedin && <div className="friend-linkedin">
                        LinkedIn: {retrievedDetails.linkedin}
                    </div>}

                    {retrievedDetails.otherlink && <div className="friend-otherlink">
                        Other link: {retrievedDetails.otherlink}
                    </div>}
                </div>

                <div className="r-f-d-btn add-to-folder hover">
                        <button onClick={() => {
                            saveToFolder();

                            setFileSaved(false);
                        }}>Save</button>
                </div>
            </div>}
        </div>
    )
}