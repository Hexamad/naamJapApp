const express = require('express');
const router = express.Router();
const { updateProgress, getProgress, getAllMantrasProgress } = require('../controllers/progressController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.post('/update', updateProgress);
router.get('/mantra/:mantraName', getProgress);
router.get('/all', getAllMantrasProgress);

module.exports = router;