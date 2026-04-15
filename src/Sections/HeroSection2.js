import React, { useRef } from "react";
import { Link } from "react-router-dom";
import galleryBackground from "../Icons/gallery-background.jpg";
import "./HeroSection2.css";

const HeroSection2 = ({
  title = "Ranbeer Chaudhary",
  subtitle1 = "Original paintings and limited-edition prints",
  subtitle2= "Bold colors, modern form, and stories from heritage",
  onExploreClick,
}) => {
  return (
    <div className="horizontal-container hero-section" >
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
            <button onClick={onExploreClick} className="button01 hero-button" role="button">
              <span class="text">Explore Collections</span>
              <span>Explore</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;
