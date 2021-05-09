
require('dotenv').config();
const Server = require('./models/server');
/*
const Serial = require('./models/serial');
const serial = new Serial();
serial.data();
*/
const server = new Server();
server.listen();
server.getData();
