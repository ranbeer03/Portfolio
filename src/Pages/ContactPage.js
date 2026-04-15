import React from 'react';
import './ContactPage.css'; 
import Contact from '../Sections/Contact';

const ContactPage = () => {
  return (
      <div className="page">
        <h1 className='page-header'>Get in Touch</h1>
        <Contact/>
      </div>
  );
}

export default ContactPage;