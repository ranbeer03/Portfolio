import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Font from './Fonts/MontereyFLF.ttf';

const Navbar = () => {
  const font = new FontFace('CustomFont', `url(${Font})`);

  font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
  }).catch((error) => {
    console.error(`Failed to load font: ${error}`);
  });

  const logo = process.env.PUBLIC_URL + '/Images/RC_Logo1.png';

  return (
    <nav className="navbar">
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
    </nav>
  );
}

export default Navbar;
