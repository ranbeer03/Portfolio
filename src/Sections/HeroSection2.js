import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection2.css";

const HeroSection2 = ({
  title = "Ranbeer Chaudhary",
  subtitle1 = "Original paintings and limited-edition prints",
  subtitle2= "Bold colors, modern form, and stories from heritage"
}) => {
  const heroRef = useRef(null);
  return (
    <div className="horizontal-container hero-section">
      <div className="vertical-container hero-content">
        <h1 className="hero-header">{title}</h1>
        <ul className="hero-subtitle">
          <li >
            {subtitle1}
          </li>
          <li>
            {subtitle2}
          </li>
        </ul>
        <div className="button-container">
            <Link to='/shop' className="primary-button">
                Explore Collections
            </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;
