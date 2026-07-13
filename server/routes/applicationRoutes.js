const express = require('express');
const router = express.Router();
const { applyForJob, getMyApplications } = require('../controllers/applicationController');
const protect = require('../middleware/authMiddleware');

router.post('/apply/:jobId', protect, applyForJob);
router.get('/my-applications', protect, getMyApplications);

module.exports = router;