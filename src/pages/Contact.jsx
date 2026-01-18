import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const formRef = useRef();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      formRef.current.reset();
      
      setTimeout(() => setSent(false), 3000);
    }, 1500);


  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-form-section">
          <div className="form-header">
            <div className="contact-badge">Get In Touch</div>
            <h1>Contact Us</h1>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </label>
              <input 
                type="text" 
                id="name"
                name="name" 
                placeholder="John Doe" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                name="email" 
                placeholder="john@example.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Subject
              </label>
              <input 
                type="text" 
                id="subject"
                name="subject" 
                placeholder="How can we help?" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Message
              </label>
              <textarea 
                id="message"
                name="message" 
                placeholder="Tell us more about your inquiry..." 
                rows="5"
                required 
              />
            </div>

            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : sent ? (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        

             
        
      </div>
    </div>
  );
};

export default Contact;