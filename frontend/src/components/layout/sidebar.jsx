import React from 'react';
import '../../styles/sidebar.css';
import { FaHome, FaChartBar, FaCog, FaUsers, FaHeart, FaSignOutAlt, } from 'react-icons/fa';
import { NavLink, useNavigate  } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const logoutHandling = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };



  return (
    <aside className="sidebar">
      <nav className="nav-links">
        <NavLink to="/profile/me" className="nav-item">
          <FaHome className="icon" />
          <span className="nav-text"> Home</span>
        </NavLink>

        <NavLink to="/main" className="nav-item">
          <FaChartBar className="icon" />
          <span className="nav-text"> Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className="nav-item">
          <FaUsers className="icon" />
          <span className="nav-text"> Users</span>
        </NavLink>


        <NavLink to="/favorites" className="nav-item">
          <FaHeart className="icon" />
          <span className="nav-text"> Favorites</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <FaCog className="icon" />
          <span className="nav-text"> Settings</span>
        </NavLink>

        <div className='nav-item logout-link' onClick={logoutHandling} style={{ cursor: 'pointer'}}>
          <FaSignOutAlt className="icon" />
          <span className="nav-text"> Logout</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;


