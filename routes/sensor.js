
const { Router } = require('express');
const sensorGet = require('../controllers/sensor');

const router = Router();

router.get( '/', sensorGet );

module.exports = router;