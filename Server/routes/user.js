const express = require('express');

const userC = require('../Controller/user');

router = express.Router()

router.post('/appointment',userC.postAppointment);

module.exports = router;