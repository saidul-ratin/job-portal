const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <span className="section-eyebrow">About Us</span>
        <h1>Connecting Talent with Opportunity</h1>
        <p>
          JobPortal is your trusted destination for finding the perfect job or the
          perfect candidate. We connect talented job seekers with companies looking
          to build great teams.
        </p>
      </section>

      <section className="about-mission">
        <div className="about-mission-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify the job search and hiring process by providing
            a fast, reliable, and user-friendly platform. Whether you're a job seeker
            looking for your next opportunity or a company searching for top talent,
            JobPortal is here to help every step of the way.
          </p>
        </div>
      </section>

      <section className="about-offer">
        <span className="section-eyebrow">What We Offer</span>
        <h2>Everything You Need in One Platform</h2>

        <div className="about-offer-grid">
          <div className="about-offer-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Smart Job Search</h3>
            <p>Powerful filters by category, location, and job type help you find the right role faster.</p>
          </div>

          <div className="about-offer-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L4.09347 12.6879C3.74547 13.1064 3.57147 13.3157 3.56964 13.4925C3.56805 13.6461 3.63762 13.7923 3.75778 13.8889C3.89584 14 4.16889 14 4.71497 14H12L11 22L19.9065 11.3121C20.2545 10.8936 20.4285 10.6843 20.4304 10.5075C20.4319 10.3539 20.3624 10.2077 20.2422 10.1111C20.1042 10 19.8311 10 19.285 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Quick Applications</h3>
            <p>A simple, streamlined one-click application process built for busy job seekers.</p>
          </div>

          <div className="about-offer-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Employer Tools</h3>
            <p>Complete job posting and management tools designed for busy hiring teams.</p>
          </div>

          <div className="about-offer-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V19C3 20.1046 3.89543 21 5 21H21M7 14L11 10L14 13L20 7M20 7H15M20 7V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Live Tracking</h3>
            <p>Real-time application tracking so you always know exactly where you stand.</p>
          </div>
        </div>
      </section>

      <section className="about-why">
        <span className="section-eyebrow">Our Values</span>
        <h2>Why Choose Us</h2>
        <p>
          We believe in transparency, simplicity, and speed. Our platform is built
          with modern technology to ensure a smooth experience for everyone, whether
          you're hiring or job hunting.
        </p>
      </section>
    </div>
  );
};

export default About;