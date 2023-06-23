import React from 'react';
import { Button } from 'react-bootstrap';
import './Contact.css'

function Contact() {
  return (
    <div className='contact'>
      <div className="header">
        <span className="background-title">CONTACT</span>
        <span className="overlay-title">Get In Touch</span>
      </div>
      <div className='content'>
        <div className='info'>
          <h4>Address</h4>
          <p>Old Street<br />
            London<br />
            United Kingdom</p>

          <h4>Phone</h4>
          <p>(+44) 7513368891<br />
            (+91) 9811020884</p>

          <h4>Email</h4>
          <p>ranbeerchaudhary03@gmail.coom</p>

          <h4>Follow Me</h4>
          {/* Add any social media links here */}
        </div>

        <form className='message'>
          <h3 className='heading'>Send Me a Note</h3>
          <textarea className='message-name' placeholder="Name" />
          <textarea className='message-name' placeholder="Email" />
          <textarea className='message-note' placeholder="Your message..." />
          <button className="button01" role="button"><span class="text">Send Message</span><span>Send</span></button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
