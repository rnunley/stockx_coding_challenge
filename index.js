const Server = require('./server');
const DB = require('./db');

// Update these for your setup.
const dbUserName = 'stockx_rwn_service';
const dbUserPassword = 'password123';
const dbURL = 'localhost';
const dbName = 'postgres';
const dbPort = 5432;

const db = new DB(dbName, dbURL, dbUserName, dbUserPassword, dbPort);

const server = new Server(db, 1962);

server.start();