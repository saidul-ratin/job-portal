import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: 'Full-time',
    category: '',
    deadline: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/${id}`);
        const job = response.data;
        setFormData({
          title: job.title,
          company: job.company,
          description: job.description,
          requirements: job.requirements,
          salary: job.salary || '',
          location: job.location,
          jobType: job.jobType,
          category: job.category,
          deadline: job.deadline ? job.deadline.substring(0, 10) : '',
        });
      } catch (err) {
        setError('Failed to load job');
      } finally {
        setFetching(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axiosInstance.put(`/jobs/${id}`, formData);
      navigate('/my-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading job data...</p>
      </div>
    );
  }

  return (
    <div className="job-form-page">
      <Link to="/my-jobs" className="job-details-back">← Back to My Jobs</Link>

      <div className="job-form-header">
        <span className="section-eyebrow">Job Management</span>
        <h1>Edit Job Posting</h1>
        <p>Update the details of your job listing below.</p>
      </div>

      {error && <p className="error-message" style={{ maxWidth: 700, margin: '0 auto 20px' }}>{error}</p>}

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="job-form-section">
          <h3>Basic Information</h3>
          <div className="job-form-grid">
            <div className="job-form-field">
              <label>Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Company Name</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="job-form-section">
          <h3>Job Details</h3>
          <div className="job-form-field">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div className="job-form-field">
            <label>Requirements</label>
            <textarea name="requirements" value={formData.requirements} onChange={handleChange} required />
          </div>
        </div>

        <div className="job-form-section">
          <h3>Job Specifications</h3>
          <div className="job-form-grid">
            <div className="job-form-field">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Salary (optional)</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
            </div>
            <div className="job-form-field">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="job-form-field">
              <label>Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="job-form-submit">
          {loading ? 'Updating...' : 'Update Job'}
        </button>
      </form>
    </div>
  );
};

export default EditJob;