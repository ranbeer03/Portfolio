import React from 'react';
import { FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
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
            <p><i className="fas fa-map-marker-alt fa-01x info-icon"></i>Old Street<br />
              London<br />
              United Kingdom</p>

          <h4>Phone</h4>
          <p><i className="fas fa-phone-alt fa-01x info-icon"></i>(+44) 7513368891<br />
             <i className="fab fa-whatsapp fa-01x info-icon"></i>(+91) 9811020884</p>

          <h4>Email</h4>
          <p><i className="fas fa-envelope fa-01x info-icon"></i>ranbeerchaudhary03@gmail.com</p>

          <h4>Socials</h4>
          <ul className='social-icons'>
            <li><a href="#"><i className="fab fa-instagram fa-2x"></i></a></li>
            <li><a href="#"><i className="fab fa-whatsapp fa-2x"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter fa-2x"></i></a></li>
          </ul>

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
