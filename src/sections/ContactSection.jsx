import { useState } from 'react';
import { createInquiry } from '../services/inquiryService';
import './ContactSection.css';
import { CONTACT_EMAIL } from '../config';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Invalid email address';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      await createInquiry({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('error');
    }
  };

  return (
    <section className="section contact-wrap">
      <div className="contact-card">
        <div className="contact-info">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="contact-title">Let's talk about art</h2>
            <p className="contact-lead">
              Inquiries about originals, prints, and commissions — or just to
              say hi.
            </p>
          </div>
          <ul className="contact-details">
            <li>
              <i className="fa-solid fa-envelope" aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <a href="tel:+447513368891">+44 7513 368891</a>
            </li>
            <li>
              <i className="fa-brands fa-instagram" aria-hidden="true" />
              <a
                href="https://www.instagram.com/ranbeer.art/"
                target="_blank"
                rel="noreferrer"
              >
                @ranbeer.art
              </a>
            </li>
            <li>
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              <span>Geneva, Switzerland</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-row">
            <div className="field">
              <label htmlFor="contact-first-name">First name *</label>
              <input
                id="contact-first-name"
                type="text"
                className="input"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <span className="error-text">
                  <i className="fa-solid fa-circle-exclamation" />
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="contact-last-name">Last name</label>
              <input
                id="contact-last-name"
                type="text"
                className="input"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email *</label>
            <input
              id="contact-email"
              type="email"
              className="input"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="error-text">
                <i className="fa-solid fa-circle-exclamation" />
                {errors.email}
              </span>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="input"
              placeholder="Tell me what you have in mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="contact-submit">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            {status === 'success' && (
              <p className="contact-status success" role="status">
                <i className="fa-solid fa-circle-check" /> Thank you — I'll get
                back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="contact-status error" role="alert">
                <i className="fa-solid fa-circle-exclamation" /> Something went
                wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
