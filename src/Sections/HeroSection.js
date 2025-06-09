import React, { Suspense, useState, useEffect, forwardRef } from 'react';
import useTypewriter from 'react-typewriter-hook';
import './HeroSection.css';
import { supabase } from '../Data/SupaBaseClient';


const Hero = forwardRef((props, ref) => {
  // console.log("database details: " + process.env.REACT_APP_SUPABASE_URL)
  return (
      <div ref={ref} className="container">
        <div className="hero-content">
          <h1 className ="hero-header">
            Ranbeer Chaudhary
          </h1>
          <h2>Artist / Painter / Creative</h2>
          <p>
            Welcome to my portfolio, a place where traditional artistry fuses
            with the innovation of the digital world.
            I navigate the canvas of both classic and modern art, transcending
            the conventional boundaries of art.
          </p>
        </div>
      </div>
  );
});

export default Hero;
