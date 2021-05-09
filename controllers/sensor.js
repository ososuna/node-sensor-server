
const { response } = require('express');

const sensorGet = ( req, res = response ) => {
    res.json({
        ok: true,
        data: 'data'
    });
}

module.exports = sensorGet;