import { useEffect, useState } from 'react'
import './profile.css'
import { Link, useNavigate } from 'react-router-dom';
import { IdGenerator } from './genId';
import { MyDetails } from './myDetails';

export function Profile({getFriends}) {
    const [chooseImg, setChooseImg] = useState(false);
    const [imgFile, setImgFile] = useState(null);

    const [token, setToken] = useState(() => localStorage.getItem('token'));
    
    const [userId, setUserId] = useState(() => localStorage.getItem('user-id'));
    
    const [imgURL, setImgURL] = useState(() => localStorage.getItem('img-url'));
    // console.log(imgURL);

    const [profilePic, setProfilePic] = useState(() => localStorage.getItem('useremail'));
    // console.log(profilePic);

    const navigate = useNavigate();

    const [id, setId] = useState(() => localStorage.getItem('my-id'));
    console.log(id)

    const updateImgFunc = async () => {
        try {
            if(!imgFile) {
                return alert(`Please choose an image!`)
            }

            const formData = new FormData();
            formData.append('image', imgFile);
            console.log(formData)

            const res = await fetch(`https://friendi-be.onrender.com/friendi/uploadpp/${userId}`, {
                method : 'PUT',
                headers : {
                    Authorization : `Bearer ${token}`
                },
                body : formData
            });

            const data = await res.json();
            const imageUrl = data?.image?.url;
            console.log(imageUrl);

            if(data) {
                return alert(data.message);
            }

            if (!res.ok || !imageUrl) {
            console.error("Upload failed or invalid response:", data);
            return alert("Something went wrong! Please try again.");
            }

            setImgURL(imageUrl);

            localStorage.removeItem("img-url");
            localStorage.setItem("img-url", imageUrl);

            setChooseImg((c) => !c);
        } catch (error) {
            console.log(error);
            
            alert("Something went wrong while uploading the image. Please try again.");
        }
    }

    const changeIdFunc = async () => {
        try {
            const res = await fetch(`https://friendi-be.onrender.com/friendi/${userId}/id`, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({id})
            });

            const result = await res.json()
            console.log(result)
                        
            localStorage.removeItem('my-id');
            localStorage.setItem('my-id', result.id);

            if(result) {
                return alert(result.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-pic">
                    {imgURL == null || imgURL == 'undefined' && profilePic 
                    ? 
                    (profilePic.charAt(0).toUpperCase())
                    :
                    (imgURL && <img src={imgURL} />)}
                </div>

                <span className='edit-pp hover' onClick={() => {
                    setChooseImg((c) => !c)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="20" color="#000000" fill="none">
                        <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M11 20H17" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </span>
                

                <div className="gap"></div>

                <Link className="home-link" to={'/'}><div className="home-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div></Link>
            </div>

            {chooseImg && <div className="choose-img">
                <div className="bb choose-img-input">
                    
                    <input type='file' placeholder='Your Picture'  accept="image/*" onChange={(e) => {
                        setImgFile(e.target.files[0]);
                    }}/>
                
                    <span className="choose-img-btn hover">
                        <button onClick={() => {
                            updateImgFunc();
                        }}>Update</button>
                    </span>
                </div>
            </div>}
            
            <div>
                <IdGenerator id={id} setId={setId} changeIdFunc={changeIdFunc}/>
            </div>

            <div className="blur-border">
                <Link to={'/folder'} className='folder-link'>
                <div className="my-friends" onClick={() => {
                    getFriends();
                }}>
                    <div>Friends</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
        <path d="M7.5 19.5C7.5 18.5344 7.82853 17.5576 8.63092 17.0204C9.59321 16.3761 10.7524 16 12 16C13.2476 16 14.4068 16.3761 15.3691 17.0204C16.1715 17.5576 16.5 18.5344 16.5 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
        <path d="M17.5 11C18.6101 11 19.6415 11.3769 20.4974 12.0224C21.2229 12.5696 21.5 13.4951 21.5 14.4038V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="17.5" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
        <path d="M6.5 11C5.38987 11 4.35846 11.3769 3.50256 12.0224C2.77706 12.5696 2.5 13.4951 2.5 14.4038V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
                    </svg>
                </div></Link>
            </div>

            <div>
                <MyDetails/>
            </div>

            <div className="logout">
                <Link to={'/login'}><button onClick={() => {
                    localStorage.clear();
                    alert(`You have logged out, please log in !`)                    
                }}>Log Out</button></Link>
            </div>

        </div>
    )
}