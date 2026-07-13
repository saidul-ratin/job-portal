const express = require('express');
const router = express.Router();
const {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');
const protect = require('../middleware/authMiddleware');

// Public routes (no login needed)
router.get('/', getJobs);
router.get('/my-jobs', protect, getMyJobs);
router.get('/:id', getJobById);

// Protected routes (login required)
router.post('/', protect, createJob);
router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

module.exports = router;