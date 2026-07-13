import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { setCredentials } from '../redux/authSlice';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Load current profile info into the form
  useEffect(() => {
    if (userInfo) {
      setFormData({ name: userInfo.name, email: userInfo.email });
    }
  }, [userInfo]);

  // Load applied jobs summary
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get('/applications/my-applications');
        setAppliedJobs(response.data);
      } catch (err) {
        // silently fail, not critical for dashboard
      } finally {
        setJobsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => { setMessage(''); setError(''); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axiosInstance.put('/auth/profile', formData);
      // Update Redux + localStorage with new info, keep the existing token
      dispatch(setCredentials({ ...response.data, token: userInfo.token }));
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>My Dashboard</h1>

      <div className="dashboard-section">
        <h2>Profile Information</h2>

        {message && <div className="toast toast-success">{message}</div>}
        {error && <div className="toast toast-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>

      <div className="dashboard-section">
        <h2>My Applied Jobs</h2>

        {jobsLoading ? (
          <div className="skeleton-grid">
            {[1, 2].map((i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line medium"></div>
              </div>
            ))}
          </div>
        ) : appliedJobs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <div className="jobs-list">
            {appliedJobs.map((app) => (
              <div className="job-card" key={app._id}>
                <h3>{app.job?.title}</h3>
                <p><strong>{app.job?.company}</strong></p>
                <p>{app.job?.location} · {app.job?.jobType}</p>
                <span className={`status status-${app.status.toLowerCase()}`}>{app.status}</span>
              </div>
            ))}
          </div>
        )}

        <Link to="/my-applications">View All Applications</Link>
      </div>
    </div>
  );
};

export default Dashboard;