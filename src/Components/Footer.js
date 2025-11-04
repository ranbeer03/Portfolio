import React from 'react';
import './Footer.css'; // We will create this file for styling.';

const Footer = () => {
  return (
    <div className="horizontal-container footer-container">
      <div className="footer-section left">
        <div className="vertical-container">
          <a href="mailto:ranbeerchaudhary03@gmail.com?subject=Hello%20Ranbeer&body=I%20saw%20your%20portfolio" className="hover-links">ranbeerchaudhary03@gmail.com</a>
          <a href="tel:+447513368891" className="hover-links">+44 7513368891</a>
        </div>
        <p>Geneva, Switzerland</p>
      </div>
      <div className="footer-section center">
        <p>Copyright © 2025 All Rights Reserved</p>
        <a href='#'>Ranbeer Chaudhary</a>
      </div>
      <div className="horizontal-container social-icons footer-section right">
        <li><a href="https://www.instagram.com/ranbeer.art/" target="_blank"><i className="fab fa-instagram fa-2x"></i></a></li>
        <li><a href="https://wa.me/+447513368891" target="_blank"><i className="fab fa-whatsapp fa-2x"></i></a></li>
      </div>
    </div>
  );
}

export default Footer;
