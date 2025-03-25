import React from 'react';
import './ContactPage.css'; 
import Contact from '../Components/Contact';
import HeroSection from "../Components/HeroSection";
import AboutMe from "../Components/AboutMe";
import Services from "../Components/Services";
import Resume from "../Components/Resume";

const ContactPage = () => {
  return (
      <div className="Contact">
        <Contact/>
      </div>
  );
}

export default ContactPage;