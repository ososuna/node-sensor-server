
require('dotenv').config();
const Server = require('./models/server');

// Instance of class Server
const server = new Server();

// Server listening at port 8080
server.listen();

// Sending data by get method
server.getData();
