import React from 'react';
import './AboutPage.css'; 
import AboutMe from '../Components/AboutMe';
import Services from '../Components/Services';
import Resume from '../Components/Resume';
import Contact from '../Components/Contact';

const AboutPage = () => {
  return (
    <div className="about">
      <AboutMe/>
      <Services/>
      <Resume/>
      <Contact />
    </div>
  );
}

export default AboutPage;
