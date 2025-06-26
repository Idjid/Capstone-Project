import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/pages/log-page.jsx'
import MainBoard from './components/pages/main-page.jsx';
import Register from './components/pages/reg-page.jsx';
import Layout from './components/layout/layout.jsx';

function App() {
  return (
    <Router>
      <nav>
          <Link to="/login">Login</Link> | 
          <Link to="/main">Main</Link> | 
          <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Layout><MainBoard /></Layout>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
    </Router>
    
  );
}

export default App;