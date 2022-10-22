const express = require('express')
const { addQCM } = require('../controllers/dashboardController');
const { getGoodResponsesPercentage, getWeaknesses } = require('../controllers/qcmController');
const router = express.Router();

router.post('/dashboard', addQCM);
router.get('/qcm/:goodResponses', getGoodResponsesPercentage);
router.get('/qcm/:weaknesses', getWeaknesses);

module.exports = router;

