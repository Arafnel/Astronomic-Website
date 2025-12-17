import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Objects from './pages/Objects';
import Events from './pages/Events';
import NASA from './pages/NASA';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';

const Navigation = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);
  
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    marginBottom: '20px'
  };
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    transition: 'all 0.3s'
  };
  
  const activeLinkStyle = {
    ...linkStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  
  return (
    <nav style={navStyle}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
        ⭐ AstrumAtlas
      </Link>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={location.pathname === '/' ? activeLinkStyle : linkStyle}>Главная</Link>
        <Link to="/objects" style={location.pathname === '/objects' ? activeLinkStyle : linkStyle}>Объекты</Link>
        <Link to="/events" style={location.pathname === '/events' ? activeLinkStyle : linkStyle}>События</Link>
        <Link to="/nasa" style={location.pathname === '/nasa' ? activeLinkStyle : linkStyle}>NASA</Link>
        {isLoggedIn ? (
          <>
            <Link to="/favorites" style={location.pathname === '/favorites' ? activeLinkStyle : linkStyle}>Избранное</Link>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                window.location.href = '/';
              }}
              style={linkStyle}
            >
              Выход
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={location.pathname === '/login' ? activeLinkStyle : linkStyle}>Вход</Link>
            <Link to="/register" style={location.pathname === '/register' ? activeLinkStyle : linkStyle}>Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)', color: 'white' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/objects" element={<Objects />} />
          <Route path="/events" element={<Events />} />
          <Route path="/nasa" element={<NASA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;