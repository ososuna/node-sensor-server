
const express = require('express');
const cors = require('cors');
const Serial = require('../models/serial');

class Server {

    constructor() {
        // Express
        this.app = express();
        // PORT 8080 at environment variables
        this.port = process.env.PORT;
        // Http path
        this.sensorPath = '/api/sensor';

        // Middlewares
        this.middlewares();
        
        this.serial = new Serial();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body lecturer and parse
        this.app.use( express.json() );

        // Public directory
        this.app.use( express.static('public') );

    }

    getData() {

        let dataSensor;

        this.serial.parser.on( 'data',  ( data ) => {
            
            // Separate temperature and humidity
            dataSensor = data.split('\n');

            // Print in console temperature and humidity everytime it is sent by Serial
            console.log( `Humidity: ${ dataSensor[0] } %, Temperature: ${ dataSensor[1] } *C` );
            
            // Send temperature and humidity by get method
            this.app.get( this.sensorPath, ( req, res ) => {
                res.json({
                    ok: true,
                    hum: dataSensor[0],
                    temp: dataSensor[1]
                });
            })

        });
    }

    // Server starts listening
    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto', this.port );
        });
    }

}

module.exports = Server;