const assert = require('assert');
const Registrations = require('../services/reg-numbers');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder@localhost:5432/reg_numbers';
const pool = new Pool({
    connectionString
});

describe('Registration Numbers', function () {

    beforeEach(async function () {
        await pool.query("delete from towns;");
    });

    // it('should return 0', async function () {
    //     let reg = Registrations(pool);
    //     let results = await reg.myData();
    //     assert.equal(results.length, 0);  
    // });

    it('should select from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA', 21);
        let results = await reg.myData();
        assert.strictEqual(results.length, 1);

    });

    // it('should add one registration number', async function () {
    //     let reg = Registrations(pool);
    //     let results = await reg.tryAddPlate('CA9502', 1);

    //     assert.equal(results.length, 1);
    // });


    after(function () {
        pool.end();
    })
});