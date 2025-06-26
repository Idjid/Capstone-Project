import React from 'react';
import Sidebar from './sidebar';
import '../../styles/layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="flex-container">
        <Sidebar />
        <main className="main-section">
          {children}
        </main>
      </div>
    </div>
  );
}
export default Layout;