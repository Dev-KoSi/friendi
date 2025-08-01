import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { Home } from './components/home';
import { Login } from './components/login';
import { Profile } from './components/profile';
import { Signup } from './components/signup';
import { useEffect } from 'react';
import { Folder } from './components/folder';
import { NavBar } from './components/navBar';

export function App() {
  // const [token, setToken] = useState(() => localStorage.getItem('token'));

  const expiredToken = () => {
    const location = useLocation();

    useEffect(() => {
      const loginTime = localStorage.getItem('loginTime');
      const aDay = 1000 * 60 * 60 * 24;
      const now = Date.now();

      if (loginTime && now - parseInt(loginTime) >= aDay) {
        
        localStorage.clear();
        window.location.href = '/login';
      }
    }, [location]);
  }

  const [file, setFile] = useState(() => JSON.parse(localStorage.getItem('friends-files')) || []);
    
  const [userId, setUserId] = useState(() => localStorage.getItem('user-id'));
  
  const getFriends = async () => {
      try {
          const res = await fetch('https://friendi-be.onrender.com/friendi/getfiles', {
              method : 'POST',
              headers : {
                  'Content-Type' : 'application/json'
              },
              body : JSON.stringify({userId})
          });

          const result = await res.json();

          if(result.success === true) {
              
                localStorage.setItem('friends-files', JSON.stringify(result.getfiles));
                
                setFile(result.getfiles);
          }

      } catch (error) {
          console.log(error)
      }
  }

  const router = createBrowserRouter([
    {
      path : '/',
      element : (
        <div>
          <NavBar/>
          <Home getFriends={getFriends} expiredToken={expiredToken}/>
        </div>
      )
    },
    {
      path : '/signup',
      element : (
        <div>
          <Signup />
        </div>
      )
    },
    {
      path : '/login',
      element : (
        <div>
          <Login/>
        </div>
      )
    },
    {
      path : '/profile',
      element : (
        <div>
          <Profile getFriends={getFriends} expiredToken={expiredToken}/>
        </div>
      )
    },
    {
      path : '/folder',
      element : (
        <div>
          <Folder getFriends={getFriends} file={file} expiredToken={expiredToken}/>
        </div>
      )
    }
  ]);
  
  return (
    <RouterProvider router={router}/>
  )
}