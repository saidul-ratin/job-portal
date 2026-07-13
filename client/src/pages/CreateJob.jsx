import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const CreateJob = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axiosInstance.post('/jobs', formData);
      navigate('/my-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-page">
      <Link to="/my-jobs" className="job-details-back">← Back to My Jobs</Link>

      <div className="job-form-header">
        <span className="section-eyebrow">Job Management</span>
        <h1>Post a New Job</h1>
        <p>Fill in the details below to publish your job opening.</p>
      </div>

      {error && <p className="error-message" style={{ maxWidth: 700, margin: '0 auto 20px' }}>{error}</p>}

      <form className="job-form" onSubmit={handleSubmit}>
        <div className="job-form-section">
          <h3>Basic Information</h3>
          <div className="job-form-grid">
            <div className="job-form-field">
              <label>Job Title</label>
              <input type="text" name="title" placeholder="e.g. Frontend Developer" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Company Name</label>
              <input type="text" name="company" placeholder="e.g. Tech Solutions Ltd" value={formData.company} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <div className="job-form-section">
          <h3>Job Details</h3>
          <div className="job-form-field">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the role and responsibilities..." value={formData.description} onChange={handleChange} required />
          </div>
          <div className="job-form-field">
            <label>Requirements</label>
            <textarea name="requirements" placeholder="List required skills and experience..." value={formData.requirements} onChange={handleChange} required />
          </div>
        </div>

        <div className="job-form-section">
          <h3>Job Specifications</h3>
          <div className="job-form-grid">
            <div className="job-form-field">
              <label>Location</label>
              <input type="text" name="location" placeholder="e.g. Dhaka" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Salary (optional)</label>
              <input type="text" name="salary" placeholder="e.g. 30000-40000 BDT" value={formData.salary} onChange={handleChange} />
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
              <input type="text" name="category" placeholder="e.g. Software Development" value={formData.category} onChange={handleChange} required />
            </div>
            <div className="job-form-field">
              <label>Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="job-form-submit">
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;