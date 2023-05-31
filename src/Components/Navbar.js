import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Font from './Fonts/MontereyFLF.ttf';  // adjust path accordingly

const Navbar = () => {
  const font = new FontFace('CustomFont', `url(${Font})`);

  font.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
  }).catch((error) => {
    console.error(`Failed to load font: ${error}`);
  });

  return (
    <nav className="navbar">
      <h1>Ranbeer Chaudhary</h1>
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
