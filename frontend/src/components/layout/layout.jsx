import React from 'react';
import Sidebar from './sidebar';
import Header from './header';
import '../../styles/layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
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