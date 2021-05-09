
const SerialPort = require( 'serialport' );
const Readline = SerialPort.parsers.Readline;

class Serial {
    
    constructor() {

        this.port = new SerialPort( 'COM4', {
            baudRate: 9600
        });

        this.parser = this.port.pipe( new Readline( { delimiter: '\r\n' }) );

        this.portError();

    }

    portError() {
        this.port.on( 'error', ( err ) => {
            console.log( err ); 
        });
    }

}

module.exports = Serial;