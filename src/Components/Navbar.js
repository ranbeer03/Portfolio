import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const logo = process.env.PUBLIC_URL + '/Images/RC_Logo1.png';

  return (
    <nav className="nav-container">
      <div className="nav">
        <div className='logo-title-container'>
          <img src={logo} alt="logo" className="nav-logo" />
          <span className="nav-title">Ranbeer Chaudhary</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery">Gallery</Link> {/* Remember to create this component */}
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
