import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const JOBS_PER_PAGE = 8;

const Jobs = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sortOrder, setSortOrder] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(JOBS_PER_PAGE);

  const jobTypeFilter = searchParams.get('jobType') || '';
  const locationFilter = searchParams.get('location') || '';

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (jobTypeFilter) params.jobType = jobTypeFilter;
      if (locationFilter) params.location = locationFilter;

      const response = await axiosInstance.get('/jobs', { params });
      setJobs(response.data);
      setVisibleCount(JOBS_PER_PAGE);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const sortedJobs = [...jobs].sort((a, b) =>
    sortOrder === 'newest'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );

  const visibleJobs = sortedJobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  const activeFilterLabel = jobTypeFilter || locationFilter;

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>

      {activeFilterLabel && (
        <div className="active-filter-banner">
          Showing results for <strong>{activeFilterLabel}</strong>
          <Link to="/jobs">Clear filter ✕</Link>
        </div>
      )}

      <form className="jobs-filter" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Software Development">Software Development</option>
          <option value="Marketing">Marketing</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          <option value="Customer Support">Customer Support</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {loading && (
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((i) => (
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
          <div className="empty-state-icon">🔍</div>
          <p>No jobs found matching your search.</p>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="jobs-sort">
          <p className="jobs-sort-label"><strong>{visibleJobs.length}</strong> of <strong>{jobs.length}</strong> jobs shown</p>
          <div className="jobs-sort-control">
            <span>Sort by</span>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      <div className="jobs-list">
        {visibleJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <h3>{job.title}</h3>
            <p><strong>{job.company}</strong></p>
            <span className="job-type-badge">{job.jobType}</span>
            <p>{job.location} · {job.jobType}</p>
            {job.salary && <p>Salary: {job.salary}</p>}
            <Link to={`/jobs/${job._id}`}>View Details</Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-wrapper">
          <button className="load-more-btn" onClick={() => setVisibleCount(visibleCount + JOBS_PER_PAGE)}>
            <span>See More Jobs</span>
            <span className="load-more-count">+{Math.min(JOBS_PER_PAGE, jobs.length - visibleCount)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Jobs;