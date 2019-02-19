const {Pool} = require('pg');

class DB {
    /**
     *
     * @param {string} user
     * @param {string} host
     * @param {string} database
     * @param {string} password
     * @param {number} port
     */
    constructor( database, host, userName, password, port) {
        this._dbConnectionPool = new Pool({
            user: userName,
            host,
            database,
            password,
            port,
        });
    }

    /**
     *  Inserts new true to fit finding into the database.
     * @param {string} make
     * @param {string} model
     * @param {string} trueToFitSize
     * @returns {Promise<{id: number, make: string, model: string, size: number}>}
     */
    async insertTrueToFit(make, model, size) {
        const query = "INSERT INTO stockx_rwn.true_to_size (make, model, size) VALUES ($1, $2, $3) RETURNING *";
        const params = [make, model, size];
        let dbResult = await this._executeParmaterizedQuery(query, params);

        return dbResult[0];
    }

    /**
     * Gets average True to Fit given all findings that have been sourced. Null return indicates make/model not found.
     * @param make
     * @param model
     * @returns {Promise<null | number>}
     */
    async getAverageTrueFitForMakeAndModel(make, model) {
        const query = "SELECT AVG(size) as true_to_size FROM stockx_rwn.true_to_size WHERE make = $1 AND model = $2";
        const params = [make, model];
        let dbResult = await this._executeParmaterizedQuery(query, params);

        return (dbResult && dbResult.length > 0) ? dbResult[0] : null;

    }

    async _executeParmaterizedQuery(query, parmaters) {
        let result = null;
        let connection = await this._dbConnectionPool.connect();

        try {
            const dbResult = await connection.query(query, parmaters);

            if (dbResult.rows) {
                result = dbResult.rows;
            }
        } catch (e) {
            console.log(e.message, e.stack); // I would normally have this logging to a more adequate place (i.e. Splunk).
            throw e;
        } finally {
            connection.release();
        }

        return result;
    }
}

module.exports = DB;