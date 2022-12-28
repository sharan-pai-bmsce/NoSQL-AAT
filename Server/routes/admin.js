const express = require('express');

const adminC = require('../Controller/admin');

router = express.Router()

router.post('/categories',adminC.postCategory);

module.exports = router;