const express = require('express');
const TrueToSizeController = require('./controllers/truetosize');

class Server {
    constructor(db, port = 1962) {
        this._express = express();
        this._port = port;

        const trueToSizeController = new TrueToSizeController(db);

        this._express.use('/truetosize', trueToSizeController.router);
    }

    start() {
        this._express.listen(this._port, () => console.log(`Example app listening on port ${this._port}!`))
    }
}

module.exports = Server;