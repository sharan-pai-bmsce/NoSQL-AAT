const express = require('express');

const userC = require('../Controller/user');

router = express.Router()

// http://localhost:3000/time/2020-03-21   GET
router.get('/time/:date',userC.getTime);

// http://localhost:3000/categories   GET
router.get('/categories',userC.getCategory);

// http://localhost:3000/time/2020-03-21   POST
router.post('/appointment',userC.postAppointment);

router.get('/appointments',userC.getAppointments);

// http://localhost:3000/reports   GET
router.get('/reports',userC.getReports);

// http://localhost:3000/reports/<id>   GET
router.get('/reports/:reportId',userC.getReport);

module.exports = router;