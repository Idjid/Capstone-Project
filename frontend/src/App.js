import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from './components/pages/log-page.jsx'
import MainBoard from './components/pages/main-page.jsx';
import Register from './components/pages/reg-page.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/frontend/src/components/pages/main.js" element={<MainBoard />} />
        <Route path="/frontend/src/components/pages/reg-page.jsx" element={<Register />} />
      </Routes>
      <nav>
          <Link to="/">Login</Link> | 
          <Link to="/frontend/src/components/pages/main.js">Main</Link> | 
          <Link to="/frontend/src/components/pages/reg-page.jsx">Register</Link>
      </nav>
    </Router>
    
  );
}

export default App;