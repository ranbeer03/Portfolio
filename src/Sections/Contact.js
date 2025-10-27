import React, { forwardRef } from 'react';
import './Contact.css'

const Contact = forwardRef(() => {
  return (
    <div className='contact'>
    
      <h1 className='page-header'>Contact Me</h1>

      <div className='content'>
        <form className='message'>
          <div className='vertical-container'>
            <h3 className='secondary-header'>Send Me a Note</h3>
            <p>Questions about commissions, originals, or prints? Send a message and I’ll get back within 24–48 hours.</p>
          </div>
          <div className='horizontal-container'>
            <textarea className='message-name' placeholder="Name" />
          <textarea className='message-email' placeholder="Email" />
          </div>
          <textarea className='message-note' placeholder="Your message..." />
          <button className="button01" role="button"><span class="text">Send Message</span><span>Send</span></button>
        </form>
        <div className='info'>
          <h1 className='secondary-header'>Details</h1>
          <div className='vertical-container'>
            <h4>Based In</h4>
            <p>
              <i className="fas fa-map-marker-alt fa-01x info-icon">
              </i>Geneva, Switzerland
            </p>
          </div>
          <div className='vertical-container'>
            <h4>Phone</h4>
            <p>
              <i className="fas fa-phone-alt fa-01x info-icon"></i>(+44) 7513368891<br />
              <i className="fab fa-whatsapp fa-01x info-icon"></i>(+91) 9811020884
            </p>
          </div>

          <div className='vertical-container'>
            <h4>Email</h4>
            <p><i className="fas fa-envelope fa-01x info-icon"></i>ranbeerchaudhary03@gmail.com</p>
          </div>

          <div className='vertical-container'>
            <h4>Socials</h4>
            <div className='social-icons'>
              <li><a href="#"><i className="fab fa-instagram fa-2x"></i></a></li>
              <li><a href="#"><i className="fab fa-whatsapp fa-2x"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter fa-2x"></i></a></li>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default Contact;
