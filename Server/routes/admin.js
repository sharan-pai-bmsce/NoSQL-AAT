const express = require('express');

const adminC = require('../Controller/admin');

router = express.Router()

router.get('/categories',adminC.getCategories);

// http://localhost:3000/admin/categories   POST: This body category
router.post('/categories',adminC.postCategory);

// http://localhost:3000/admin/2020-01-22   GET: Gives list appointments on a date
router.get('/appointments/:startDate',adminC.getAppointments);

// http://localhost:3000/admin/appointmentDetail/<id>   GET
router.get('/appointmentDetail/:id',adminC.getAppointmentDetail);

router.delete('/delete-appointment',adminC.deleteAppointment);

// http://localhost:3000/admin/doctor   POST
router.post('/doctor',adminC.postDoctor);

// http://localhost:3000/admin/reportGen   PUT
router.put('/reportGen',adminC.putReport);

// http://localhost:3000/admin/reports   GET
router.get('/reports',adminC.getReports);

// http://localhost:3000/admin/report/<id>  GET
router.get('/report/:reportId',adminC.getReport);

// http://localhost:3000/admin/reports   POST
router.post('/reports',adminC.postReport);

module.exports = router;