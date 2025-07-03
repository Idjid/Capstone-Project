import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/pages/log-page.jsx'
import MainBoard from './components/pages/main-page.jsx';
import Register from './components/pages/reg-page.jsx';
import Layout from './components/layout/layout.jsx';
import UserList from './components/pages/user-list.jsx';
import BookPage from './components/pages/dynamic-book.jsx';
import Profile from './components/pages/profile.jsx';
import UserProfile from './components/pages/userProfile.jsx';

function App() {
  return (
    <Router>
      <nav>
          <Link to="/login">Login</Link> | 
          <Link to="/register">Register</Link> |
          <Link to="/profile/me">Profile</Link> |
          <Link to="/main">Main</Link> | 
          <Link to="/admin/users">Users</Link> |
          <Link to="/books/works/:id">Book</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/me" element={<Layout><Profile /></Layout>} />
        <Route path="/main" element={<Layout><MainBoard /></Layout>} />
        <Route path="/admin/users" element={<Layout><UserList /></Layout>} />
        <Route path="/books/works/:id" element={<Layout><BookPage /></Layout>} />
        <Route path="/profile/:id" element={<Layout><UserProfile /></Layout>} />
        
      </Routes>
      
    </Router>
    
  );
}

export default App;