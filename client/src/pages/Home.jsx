import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Home = () => {
  const navigate = useNavigate();
  const [latestJobs, setLatestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalJobs: 0, totalCompanies: 0 });
  const [categoryCounts, setCategoryCounts] = useState({});
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(heroSearch)}`);
  };

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const response = await axiosInstance.get('/jobs');
        const allJobs = response.data;
        setLatestJobs(allJobs.slice(0, 4));

        const uniqueCompanies = new Set(allJobs.map((job) => job.company));
        setStats({
          totalJobs: allJobs.length,
          totalCompanies: uniqueCompanies.size,
        });

        const counts = {};
        allJobs.forEach((job) => {
          counts[job.category] = (counts[job.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      } catch (err) {
        // fail silently for homepage
      } finally {
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);

  const categories = [
    {
      name: 'Software Development',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9L4 12L8 15M16 9L20 12L16 15M14 5L10 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Marketing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 11L20 3L13 20L11 13L3 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Design',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19L19 12L22 15L15 22L12 19ZM12 19L5 12L2 15L9 22L12 19ZM19 12L14 7L9 2L5 6L10 11L15 16L19 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Sales',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 6L13.5 15.5L8.5 10.5L1 18M23 6H17M23 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Customer Support',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8C18 3.58172 14.4183 0 10 0C5.58172 0 2 3.58172 2 8M2 8H1C0.447715 8 0 8.44772 0 9V13C0 13.5523 0.447715 14 1 14H2M2 8V14M18 8H19C19.5523 8 20 8.44772 20 9V13C20 13.5523 19.5523 14 19 14H18M18 8V14M18 14V15C18 17.2091 16.2091 19 14 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(2, 3)"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="home-page">

      {/* Section 1: Hero Banner */}
      <section className="hero-banner">
        <h1>Find Your Dream Job Today</h1>
        <p>Explore thousands of job opportunities from top companies</p>

        <form className="hero-search" onSubmit={handleHeroSearch}>
          <input
            type="text"
            placeholder="Job title, keyword..."
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
          />
          <button type="submit">Search Jobs</button>
        </form>

        <div className="hero-quicklinks">
          <span>Popular:</span>
          <Link to="/jobs?jobType=Full-time">Full-time</Link>
          <Link to="/jobs?location=Remote">Remote</Link>
          <Link to="/jobs?jobType=Internship">Internship</Link>
        </div>
      </section>

      {/* Section 2: Latest Job Listings */}
      <section className="latest-jobs-section">
        <h2>Latest Job Listings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : latestJobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          <div className="jobs-list">
            {latestJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h3>{job.title}</h3>
                <p><strong>{job.company}</strong></p>
                <span className="job-type-badge">{job.jobType}</span>
                <p>{job.location} · {job.jobType}</p>
                <Link to={`/jobs/${job._id}`}>View Details</Link>
              </div>
            ))}
          </div>
        )}

        <Link to="/jobs" className="see-all-link">
          <span>See All Jobs</span>
          <span>→</span>
        </Link>
      </section>

      {/* Section 3: Popular Job Categories */}
      <section className="categories-section categories-section-bg">
        <span className="section-eyebrow" style={{ textAlign: 'center', display: 'block' }}>Explore Fields</span>
        <h2>Popular Job Categories</h2>
        <p className="why-choose-subtitle">Browse jobs by category and find opportunities that match your skills.</p>

        <div className="categories-list">
          {categories.map((cat) => (
            <Link to={`/jobs?category=${encodeURIComponent(cat.name)}`} className="category-card" key={cat.name}>
              <div className="category-icon">{cat.icon}</div>
              <div className="category-card-text">
                <span>{cat.name}</span>
                <span className="category-card-count">
                  {categoryCounts[cat.name] || 0} {categoryCounts[cat.name] === 1 ? 'job' : 'jobs'} open
                </span>
              </div>
            </Link>
          ))}

          <Link to="/jobs" className="category-card category-card-cta">
            <div className="category-cta-content">
              <span className="category-cta-title">Can't find your field?</span>
              <span className="category-cta-desc">Browse all {stats.totalJobs} open positions across every category</span>
            </div>
            <span className="category-cta-btn">View All Jobs →</span>
          </Link>
        </div>
      </section>

      {/* Section 4: Why Choose Us */}
      <section className="why-choose-us-section">
        <span className="section-eyebrow" style={{ textAlign: 'center', display: 'block' }}>Why JobPortal</span>
        <h2>Built for Your Success</h2>
        <p className="why-choose-subtitle">Everything you need to land your next opportunity, all in one place.</p>

        <div className="features-list">
          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Verified Companies</h3>
            <p>We partner only with verified, trusted employers to ensure a safe job search experience.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L4.09347 12.6879C3.74547 13.1064 3.57147 13.3157 3.56964 13.4925C3.56805 13.6461 3.63762 13.7923 3.75778 13.8889C3.89584 14 4.16889 14 4.71497 14H12L11 22L19.9065 11.3121C20.2545 10.8936 20.4285 10.6843 20.4304 10.5075C20.4319 10.3539 20.3624 10.2077 20.2422 10.1111C20.1042 10 19.8311 10 19.285 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Instant Applications</h3>
            <p>Apply to your dream job in just a few clicks with our streamlined application process.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-svg">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3V19C3 20.1046 3.89543 21 5 21H21M7 14L11 10L14 13L20 7M20 7H15M20 7V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Real-Time Tracking</h3>
            <p>Monitor the status of every application you submit, right from your personal dashboard.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Statistics */}
      <section className="stats-section">
        <span className="stats-eyebrow">Trusted by job seekers and employers</span>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7H21M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7M3 7L5 3H19L21 7M12 11V17M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>{stats.totalJobs}+</h2>
            <p>Active Job Listings</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21V8L12 3L21 8V21M9 21V14H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>{stats.totalCompanies}+</h2>
            <p>Hiring Companies</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Growing</h2>
            <p>Job Seeker Community</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;