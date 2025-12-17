import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Star, User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-space-900/80 backdrop-blur-md border-b border-space-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-cosmic-400" />
            <span className="text-xl font-bold bg-cosmic-gradient bg-clip-text text-transparent">
              AstrumAtlas
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/objects" className={`nav-link ${isActive('/objects') ? 'active' : ''}`}>
              Objects
            </Link>
            <Link to="/events" className={`nav-link ${isActive('/events') ? 'active' : ''}`}>
              Events
            </Link>
            {user && (
                <Link to="/favorites" className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}>
                Favorites
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
                <div className="flex items-center space-x-3">
                <span className="text-sm text-space-300">Hi, {user.username}!</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-space-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
                <div className="flex items-center space-x-3">
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;