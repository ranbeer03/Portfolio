import React, { forwardRef } from 'react';
import image from '../Icons/ranbeer-india-painting.png'
import './Contact.css'

const Contact = forwardRef(() => {
  return (
    <div className='contact-container'>
      <h1 className='page-header'>Get in Touch</h1>
      <div className='horizontal-container contact-section'> 
        <img className="contact-image" src={image} />
        <form className='message-section'>
          <h3 className='secondary-header'>I'd like to hear from you!</h3>
          <p>If you have any inquiries or just want to say hi,<br/> please use the contact form or the links below!</p>
          <div className='horizontal-container'>
            <input type="text" className="input input-name" placeholder="First Name" />
            <input type="text" className="input input-name" placeholder="Last Name" />
          </div>
          <input type="email" className="input input-email" placeholder="Email" />
          <textarea className='input input-note' placeholder="Your message..." />
          <button className="button01" role="button"><span class="text">Send Message</span><span>Send</span></button>
        </form>
      </div>
    </div>
  );
});

export default Contact;
