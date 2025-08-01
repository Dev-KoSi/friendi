import { useNavigate } from "react-router-dom";


export function NavBar() {
    const navigate = useNavigate();

    return (
        <div className="navBar">
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

            <div id="push-logout" className="menu-help">
                <div>Help</div>
            </div>

            <div id="menu-logout">
                <div onClick={() => {
                    navigate('/login');

                    localStorage.clear();
                    alert(`You have logged out, please log in.`)
                }}>Log out</div>
            </div>
        </div>
    )
}