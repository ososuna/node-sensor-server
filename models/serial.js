
const SerialPort = require( 'serialport' );
const Readline = SerialPort.parsers.Readline;

class Serial {
    
    constructor() {

        // Connect to Serial at port COM4
        this.port = new SerialPort( 'COM4', {
            baudRate: 9600
        });

        // Delimiter to read the Serial
        this.parser = this.port.pipe( new Readline( { delimiter: '\r\n' }) );

        this.portError();

    }

    portError() {
        // Validate port COM4 is working
        this.port.on( 'error', ( err ) => {
            console.log( err ); 
        });
    }

}

module.exports = Serial;