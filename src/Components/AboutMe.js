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
          <p>As a fresh graduate from King's College London, where I majored in Computer Science, and a passionate artist, I am currently based in London, UK. My education and interests uniquely situate me at the crossroads of technology and art, allowing me to appreciate and leverage the harmony between aesthetics and functionality.</p>
          <p>Driven by the fusion of artistic creativity and scientific precision, I'm pursuing opportunities in software engineering, web and app development, UI/UX design, and software management. At the same time, I continue to indulge my love for art by creating and selling original pieces. In both realms, my goal is to design and create products that not only serve their function but also captivate through their visual appeal.</p>
          <p>I am excited about exploring this interplay of art and science further in my professional journey, seeking experiences that allow for the creation of perfect blends of aesthetics and utility. I welcome the chance to learn, grow, and make a meaningful impact in both the technology and art industries.</p>
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
