import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutMe.css';

const AboutMe = () => {
    const navigate = useNavigate();
  
    const handleKnowMore = () => {
      navigate("/about");
    }
  return (
    <div className="aboutMe">
      <div className="header">
        <span className="background-title">ABOUT ME</span>
        <span className="overlay-title">Know Me More</span>
      </div>

      <div className="description">
        <div className="desc-text">
          <h2>I'm <span class="highlight">Ranbeer Chaudhary,</span> a Software Engineer and Artist.</h2>
          <p>A recent Computer Science graduate from King's College London and a passionate artist, I reside in London, UK, perfectly poised at the intersection of technology and art. I'm on the lookout for opportunities in software engineering, UI/UX design, and software management, while also creating and selling original artwork, always aiming to merge aesthetics with functionality.</p>
          <p>Keen on delving deeper into this fusion of art and science, I'm ready to expand my horizons and create perfect blends of beauty and utility in my professional journey. I eagerly anticipate learning, evolving, and making a significant contribution in the tech and art sectors.</p>
        </div>

        <div className="personal-info">
          <div className='p-info'>
            <p ><strong>Name:</strong> Ranbeer Chaudhary</p>
          </div>
          <div className='p-info'>
            <p><strong>Email:</strong><span class="highlight">ranbeerchaudhary03@gmail.com</span></p>
          </div>
          <div className='p-info'>
            <p><strong>Age:</strong> 21</p>
          </div>
          <div className='p-info'>
            <p><strong>From:</strong> London, United Kingdom</p>
          </div>
          <div className="downloads">
            <button className="button01" role="button"><span class="text">Download CV</span><span>Download CV</span></button>
            <button className="button01" role="button"><span class="text">Download Portfolio</span><span>Download Portfolio</span></button>
          </div>
        </div>
          
      </div>
  
      <div className="stats">
        <div className="stat"><strong>2+</strong> Years Experience</div>
        <div class="vertical-line"></div>
        <div className="stat"><strong>40+</strong> Happy Clients</div>
        <div class="vertical-line"></div>
        <div className="stat"><strong>50+</strong> Projects Done</div>
        <div class="vertical-line"></div>
        <div className="stat"><strong>8</strong> Awards</div>
      </div>

      

    </div>
  );
}

export default AboutMe;
