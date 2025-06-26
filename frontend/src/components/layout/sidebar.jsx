import React from 'react';
import '../../styles/sidebar.css';
import { FaHome, FaChartBar, FaCog, FaUsers, FaHeart, FaSignOutAlt, } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="nav-links">
        <NavLink to="/" className="nav-item">
          <FaHome className="icon" />
          <span className="nav-text"> Home</span>
        </NavLink>

        <NavLink to="/main" className="nav-item">
          <FaChartBar className="icon" />
          <span className="nav-text"> Dashboard</span>
        </NavLink>

        <NavLink to="/users" className="nav-item">
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

        <NavLink to="/logout" className="nav-item logout-link">
          <FaSignOutAlt className="icon" />
          <span className="nav-text"> Logout</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
