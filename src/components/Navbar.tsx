import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
        Jordan<span>Molacek</span>
      </NavLink>
      
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu} end>Home</NavLink>
        <NavLink to="/shows" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Shows</NavLink>
        <NavLink to="/media" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Media</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>Contact</NavLink>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default Navbar;
