import React from 'react';
import './AboutPage.css'; 
import AboutMe from '../Sections/AboutMe';
import Services from '../Sections/Services';
import Resume from '../Sections/Resume';
import Contact from '../Sections/Contact';

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
