import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyMessage, setApplyMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);


useEffect(() => {
    if (applyMessage) {
      const timer = setTimeout(() => setApplyMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [applyMessage]);


  const handleApply = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    try {
      await axiosInstance.post(`/applications/apply/${id}`);
      setApplyMessage('Applied successfully!');
    } catch (err) {
      setApplyMessage(err.response?.data?.message || 'Failed to apply');
    }
  };



 if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (error) return <p className="error-message" style={{ maxWidth: 500, margin: '60px auto' }}>{error}</p>;
  if (!job) return null;

  return (
    <div className="job-details">
      <Link to="/jobs" className="job-details-back">
        <span>←</span> Back to all jobs
      </Link>

      <div className="job-details-header">
        <div>
          <h1>{job.title}</h1>
          <h3>{job.company}</h3>
        </div>
        <span className="job-type-badge">{job.jobType}</span>
      </div>

      <div className="job-details-meta">
        <div className="job-details-meta-item">
          <span className="job-details-meta-label">Location</span>
          <span className="job-details-meta-value">{job.location}</span>
        </div>
        {job.salary && (
          <div className="job-details-meta-item">
            <span className="job-details-meta-label">Salary</span>
            <span className="job-details-meta-value">{job.salary}</span>
          </div>
        )}
        <div className="job-details-meta-item">
          <span className="job-details-meta-label">Deadline</span>
          <span className="job-details-meta-value">{new Date(job.deadline).toLocaleDateString()}</span>
        </div>
        <div className="job-details-meta-item">
          <span className="job-details-meta-label">Category</span>
          <span className="job-details-meta-value">{job.category}</span>
        </div>
      </div>

      <h3>Description</h3>
      <p>{job.description}</p>

      <h3>Requirements</h3>
      <p>{job.requirements}</p>

      <button onClick={handleApply}>Apply Now</button>

      {applyMessage && (
        <div className={`toast ${applyMessage.includes('successfully') ? 'toast-success' : 'toast-error'}`}>
          {applyMessage}
        </div>
      )}
    </div>
  );
};

export default JobDetails;