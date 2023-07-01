import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // This is where you'll add your styles
import Card from '../Components/Cards';
import Joker from '../Components/3DModels/Joker';
import BeautyInBloom from '../Components/3DModels/BeautyInBloom'
import HeroSection from '../Components/HeroSection'
import AboutMe from '../Components/AboutMe';
import Portfolio from '../Components/Portfolio';
import ThreeD from '../Components/ThreeD';

const HomePage = () => {
  return (
    <div className="home">
      <HeroSection />
      <Portfolio/>
      <Link to="/gallery" className='button01'><span class="text">View More</span><span class="text">Gallery</span></Link>
      <ThreeD/>
      <AboutMe/>
      <Link to="/about" className='button01'><span class="text">View More</span><span class="text">About</span></Link>
    </div>
  );
}

export default HomePage;
