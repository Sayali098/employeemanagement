// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Dashboard.css';

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     const cookies = document.cookie.split('; ');
//     const usernameCookie = cookies.find(cookie => cookie.startsWith('username='));

//     if (usernameCookie) {
//       setUsername(usernameCookie.split('=')[1]);
//     } else {
//       navigate('/login');
//     }
//   }, [navigate]);

//   const logout = () => {
//     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//     navigate('/login');
//   };

//   return (
//     <div className="dashboard">
//       <div className="navbar">
//         <span>Logo</span>
//         <span className="nav-links">
//           <span onClick={() => navigate('/')}>Home</span>
//           <span onClick={() => navigate('/employees')}>Employee List</span>
//           <span>{username} - <span onClick={logout}>Logout</span></span>
//         </span>
//       </div>
//       <div className="welcome">
//         <h1>Welcome Admin Panel</h1>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(user ? user.username : '');

  useEffect(() => {
    if (!user) {
      const cookies = document.cookie.split('; ');
      const usernameCookie = cookies.find(cookie => cookie.startsWith('username='));

      if (usernameCookie) {
        setUsername(usernameCookie.split('=')[1]);
      } else {
        navigate('/login');
      }
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <div className="welcome">
        <h1>Welcome Admin Panel</h1>
      </div>
    </div>
  );
};

export default Dashboard;
