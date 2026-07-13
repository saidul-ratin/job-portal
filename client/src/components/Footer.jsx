import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-newsletter">
          <div>
            <h3>Stay in the loop</h3>
            <p>Get the latest job openings delivered straight to your inbox.</p>
          </div>

          {subscribed ? (
            <p className="newsletter-thanks">✓ Thanks for subscribing! We'll keep you updated.</p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}


        </div>
      </div>

      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h3 className="footer-logo">JobPortal</h3>
          <p>JobPortal helps you find your dream job and connects companies with talented candidates across Bangladesh.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">f</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">𝕏</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">in</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>For Job Seekers</h3>
          <ul>
            <li><Link to="/jobs">Browse Jobs</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/dashboard">My Dashboard</Link></li>
            <li><Link to="/my-applications">My Applications</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              support@jobportal.com
            </li>
            <li>
              <span className="footer-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C8.93221 12.5745 10.8845 14.5225 12.9917 15.4936L14.1622 13.1417C14.3897 12.6835 14.9163 12.4643 15.3961 12.6259L19.8329 14.1237C20.2432 14.2607 20.5 14.6445 20.5 15.0771V18C20.5 19.1046 19.6046 20 18.5 20H17C9.26801 20 3 13.732 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              +880 1234-567890
            </li>
            <li>
              <span className="footer-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21C12 21 19 15.4183 19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10C5 15.4183 12 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 JobPortal. All rights reserved.</p>
        <p className="footer-credit">Built with passion for job seekers everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;