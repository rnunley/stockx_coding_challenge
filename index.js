const Server = require('./server');
const DB = require('./db');

// Update these for your setup.
const dbUserName = 'stockx_rwn_service';
const dbUserPassword = 'c8251435-ac13-41db-8095-ba0ec45f7d1e';
const dbURL = 'localhost';
const dbName = 'postgres';
const dbPort = 5432;

const db = new DB(dbName, dbURL, dbUserName, dbUserPassword, dbPort);

const server = new Server(db, 1962);

server.start();