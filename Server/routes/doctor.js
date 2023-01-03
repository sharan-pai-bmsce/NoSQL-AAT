const express = require('express')

const doctorC = require('../Controller/doctor');

const router = express.Router()

// Report list
router.get('/reports',doctorC.getReports);

// Specific report 
router.get('/report/:id',doctorC.getReportDetails);

// Remarks 
router.post('/remarks',doctorC.postRemarks);

module.exports = router;