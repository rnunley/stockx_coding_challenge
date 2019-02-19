const Router = require('express').Router;
const DB = require('../db');
const asyncWrap = require('../middleware/asyncroutermethod');

class TrueToSizeController {
    /**
     *
     * @param {DB} db
     */
    constructor(db) {
        this._db = db;
        this.router = Router();

        this.router.get('/', asyncWrap(this._get.bind(this)));
        this.router.post('/', asyncWrap(this._post.bind(this)));

    }

    async _get(req, res) {
        const {make, model} = req.query;

        // If this were a larger project I would bring in a library such as Yup to do this validation.
        if (make === undefined || typeof make !== 'string' ||  model === undefined || typeof model !== 'string') {
            res.status(401);
            res.send("Query params make and model are required and should be valid strings!");

            return;
        }

        try {
            res.send(await this._db.getAverageTrueFitForMakeAndModel(make, model));
        } catch (e) {
            res.status(500);
            res.send("An internal server error occurred!");
        }
    }

    async _post(req, res) {
        const {make, model, size} = req.query;
        const sizeValidator = /[0-9]*/;

        // If this were a larger project I would bring in a library such as Yup to do this validation.
        if (make === undefined || typeof make !== 'string' ||
            model === undefined || typeof model !== 'string' ||
            size === undefined || !sizeValidator.test(size)) {
            res.status(401);
            res.send("Query params make, model and size are required and should be valid strings with size being a number!");

            return;
        }

        try {
            res.send(await this._db.insertTrueToFit(make, model, size));
        } catch (e) {
            res.status(500);
            res.send("An internal server error occurred!");
        }
    }

}

module.exports = TrueToSizeController;