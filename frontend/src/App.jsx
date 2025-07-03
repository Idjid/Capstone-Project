import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/pages/log-page.jsx'
import MainBoard from './components/pages/main-page.jsx';
import Register from './components/pages/reg-page.jsx';
import Layout from './components/layout/layout.jsx';
import UserList from './components/pages/user-list.jsx';
import BookPage from './components/pages/dynamic-book.jsx';

function App() {
  return (
    <Router>
      <nav>
          <Link to="/login">Login</Link> | 
          <Link to="/main">Main</Link> | 
          <Link to="/register">Register</Link> | 
          <Link to="/admin/users">Users</Link> |
          <Link to="/books/works/:id">Book</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Layout><MainBoard /></Layout>} />
        <Route path="/admin/users" element={<Layout><UserList /></Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/books/works/:id" element={<Layout><BookPage /></Layout>} />
      </Routes>
      
    </Router>
    
  );
}

export default App;