
const express = require('express');
const cors = require('cors');
const Serial = require('../models/serial');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.sensorPath = '/api/sensor';

        // Middlewares
        this.middlewares();
        
        // Rutas de la aplicación
        // this.routes();

        this.serial = new Serial();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

    }

    /*
    routes() {
        this.app.use( this.sensorPath, require('../routes/sensor'));
    }*/

    getData() {

        let dataSensor;

        this.serial.parser.on( 'data',  ( data ) => {
            
            dataSensor = data;

            console.log( dataSensor );
            
            this.app.get( this.sensorPath, ( req, res ) => {
                res.json({
                    ok: true,
                    data: dataSensor,
                });
            })

        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto', this.port );
        });
    }

}

module.exports = Server;