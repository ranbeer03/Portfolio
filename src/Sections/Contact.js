import React, { forwardRef, useState } from "react";
import image from "../Icons/ranbeer-india-painting.png";
import "./Contact.css";
import { createInquiry } from "../Services/InquiryService.ts";

const Contact = forwardRef(() => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createInquiry({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      alert("Inquiry submitted successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="vertical-container contact-container section">
      <h1 className="page-header">Get In Touch</h1>
      <div className="horizontal-container contact-section">
        <img className="contact-image" src={image} alt="contact" />
        <form className="message-section" onSubmit={handleSubmit} noValidate>
          <h3 className="secondary-header">I'd like to hear from you!</h3>
          <p>
            If you have any inquiries or just want to say hi,
            <br /> please use the contact form or the links below!
          </p>

          <div className="horizontal-container">
            <div className="vertical-container full-width">
              <input
                type="text"
                className="input "
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <span className="error-text">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {errors.firstName}
                </span>
              )}
            </div>
            <input
              type="text"
              className="input full-width"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

            <input
              type="email"
              className="input full-width"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">
              <i className="fa-solid fa-circle-exclamation"></i> 
              {errors.email}
            </span>}

            <textarea
              className="input input-note"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <span className="error-text">{errors.message}</span>
            )}

          <button type="submit" className="button01">
            <span className="text">Send Message</span>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
});

export default Contact;
