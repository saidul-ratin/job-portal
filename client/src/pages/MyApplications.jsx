import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get('/applications/my-applications');
        setApplications(response.data);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="jobs-page">
      <h1>My Applications</h1>

      {loading && (
        <div className="skeleton-grid">
          {[1, 2, 3].map((i) => (
            <div className="skeleton-card" key={i}>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line long"></div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {!loading && applications.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <p>You haven't applied to any jobs yet.</p>
        </div>
      )}

      {!loading && applications.length > 0 && (
        <div className="jobs-list">
          {applications.map((app) => (
            <div className="job-card" key={app._id}>
              <span className="job-type-badge">{app.job?.jobType}</span>
              <h3>{app.job?.title}</h3>
              <p><strong>{app.job?.company}</strong></p>
              <p>{app.job?.location}</p>
              {app.job?.salary && <p>Salary: {app.job.salary}</p>}
              <div className="job-card-actions">
                <span className={`status status-${app.status.toLowerCase()}`}>{app.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;