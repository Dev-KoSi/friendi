import { useState } from "react";
import { Link } from "react-router-dom";


export function Folder({getFriends, file, expiredToken}) {

    expiredToken();

    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const deleteFriend = async (delId) => {
        try {
            const res = await fetch(`https://friendi-be.onrender.com/friendi/delete/${delId}`, {
                method : `DELETE`,
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            });

            const result = await res.json();

            if(result.success === true) {
                getFriends();
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="my-folder">
            <div className="folder-header">
                <Link to={'/profile'}><div className="back-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                        <path d="M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </div></Link>
                <div className="num-files">{file && file.length == 1 ? `${file.length} Friend` : `${file.length} Friends`}</div>
                <Link className="home-link" to={'/'}>
                    <div className="home-logo-folder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                            <path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M15 21.5V16.5C15 15.0858 15 14.3787 14.5607 13.9393C14.1213 13.5 13.4142 13.5 12 13.5C10.5858 13.5 9.87868 13.5 9.43934 13.9393C9 14.3787 9 15.0858 9 16.5V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                </Link>
            </div>

            <div>{file && file.map((f, index) => (
                <div className="each-file" key={index}>
                    {f.image && <div className="file-image">
                        <img src="/frontend/src/components/img/mock-user.jpg" alt="" />
                    </div>}
                    {f.name && <div className="file-name">
                        Name: {f.name}
                    </div>}
                    {f.email && <div className="file-email">
                        Email: <a href={`mailto:${f.email}`} target="_blank" rel="noopener noreferrer">{f.email}</a>
                    </div>}
                    {f.phone && <div className="file-phone">
                        Phone: <a href={`tel:${f.phone}`} target="_blank" rel="noopener noreferrer">{f.phone}</a>
                    </div>}
                    {f.github && <div className="file-github">
                        GitHub: <a href={f.github} target="_blank" rel="noopener noreferrer">{f.github}</a>
                    </div>}
                    {f.linkedin && <div className="file-linkedin">
                        LinkedIn: <a href={f.linkedin} target="_blank" rel="noopener noreferrer">{f.linkedin}</a>
                    </div>}
                    {f.otherlink && <div className="file-otherlink">
                        Other link: <a href={f.otherlink} target="_blank" rel="noopener noreferrer">{f.otherlink}</a>
                    </div>}

                    <div className="delete-friend">
                        <button onClick={() => {
                            deleteFriend(f._id);
                            getFriends();
                        }}>Delete</button>
                    </div>
                </div>
            ))}

            {file.length === 0 && 
                <Link className="home-link" to={'/'}>
                    <div className="add-friend-btn-folder hover">
                        <button>Add a friend</button>
                    </div>
                </Link>}
            </div>


        </div>
    )
}