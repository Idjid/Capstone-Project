import React from 'react';
import '../../styles/header.css';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

function Header() {
  return (
    <header className="header">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header-actions">
        <FaBell className="icon" />
        <FaUserCircle className="icon profile-icon" />
      </div>
    </header>
  );
}

export default Header;
