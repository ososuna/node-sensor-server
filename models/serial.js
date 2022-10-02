
const SerialPort = require( 'serialport' );
const Readline = SerialPort.parsers.Readline;

class Serial {
    
    constructor() {

        // Connect to Serial at port COM4
        this.port = new SerialPort( process.env.ARDUINO_PORT, {
            baudRate: 9600
        });

        // Delimiter to read the Serial
        this.parser = this.port.pipe( new Readline( { delimiter: '\r\n' }) );

        this.portError();

    }

    portError() {
        // Validate port is working
        this.port.on( 'error', ( err ) => {
            console.log( err ); 
        });
    }

}

module.exports = Serial;