import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // This is where you'll add your styles
import Card from '../Components/Cards';
import Joker from '../Components/Joker';
import BeautyInBloom from '../Components/BeautyInBloom'
import HeroSection from '../Components/HeroSection'

const HomePage = () => {
  return (
    <div className="home">
      <HeroSection />

      <div className='recent-artworks'>
        <h2>Recent Artworks</h2>
        <p>These are the last 2 artworks I created, to view more work head over to gallery or press view more button below the cards.</p>
        <div className='card-container'>
          <Card
            name="BEAUTY IN BLOOM"
            description="This piece of art exists within its true bohemian element by integrating an eclectic fusion of textures, patterns and colours. The painting parallels the beauty of an elegant woman with that of a flower. The eccentric outline of the facial structure and the wide array of colours add an unconventional layer to this graceful portrait."
            imageUrl="./Images/BeautyInBloom.jpg"
            size="19 X 16 inches"
            material="acrylic on canvas"
            Model3D={BeautyInBloom}
          />

          <Card
            name="EVERY SISTERHOOD HAS RULES"
            description="This piece of modern art showcases the subtle strength of feminine companionship. A single white outline runs throughout the positive space to form three separate female structures, exhibiting an underlying connection amongst the females. It embodies three clear and stimulating colours to highlight the strength in femininity."
            imageUrl="./Images/3Women.jpg"
            size="5.3 x 8.3 inches"
            material="acrylic on canvas"
            Model3D={Joker}
          />
        </div>
        <Link to="/gallery" className='view-more-button'>View More</Link>
      </div>
    </div>
  );
}

export default HomePage;
