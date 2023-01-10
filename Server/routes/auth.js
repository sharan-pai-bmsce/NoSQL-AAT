const express = require('express');

const authC = require('../Controller/auth');

router = express.Router()

router.put('/sign-up',authC.putSignUp);

router.post('/user-login',authC.postUserLogin);

router.post('/doctor-login',authC.postDoctorLogin);

module.exports = router;