import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyJobs = async () => {
    try {
      const response = await axiosInstance.get('/jobs/my-jobs');
      setJobs(response.data);
    } catch (err) {
      setError('Failed to load your jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;

    try {
      await axiosInstance.delete(`/jobs/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete job');
    }
  };

  return (
    <div className="jobs-page">
      <div className="my-jobs-header">
        <h1>My Job Posts</h1>
        <Link to="/create-job" className="btn-primary">+ Post New Job</Link>
      </div>

      {!loading && jobs.length > 0 && (
        <div className="my-jobs-stats">
          <div className="my-jobs-stat-card">
            <span className="my-jobs-stat-number">{jobs.length}</span>
            <span className="my-jobs-stat-label">Total Jobs Posted</span>
          </div>
          <div className="my-jobs-stat-card">
            <span className="my-jobs-stat-number">{jobs.filter(j => j.jobType === 'Full-time').length}</span>
            <span className="my-jobs-stat-label">Full-time Roles</span>
          </div>
          <div className="my-jobs-stat-card">
            <span className="my-jobs-stat-number">{new Set(jobs.map(j => j.category)).size}</span>
            <span className="my-jobs-stat-label">Categories</span>
          </div>
        </div>
      )}

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

      {!loading && jobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">💼</div>
          <p>You haven't posted any jobs yet.</p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <span className="job-type-badge">{job.jobType}</span>
              <h3>{job.title}</h3>
              <p><strong>{job.company}</strong></p>
              <p>{job.location}</p>

              <div className="job-card-actions">
                <Link to={`/edit-job/${job._id}`}>Edit</Link>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;