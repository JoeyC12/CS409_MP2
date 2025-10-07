import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MovieDB
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/search" 
              className={`navbar-link ${isActive('/search') ? 'active' : ''}`}
            >
              Search
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/gallery" 
              className={`navbar-link ${isActive('/gallery') ? 'active' : ''}`}
            >
              Gallery
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
