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
        await pool.query("delete from registrations;");
    });

    it('should return 0', async function () {
        let reg = Registrations(pool);
        let results = await reg.myData();
        assert.equal(results.length, 0);
    });

    it('should insert from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA', 1);
        let results = await reg.myData();
        assert.strictEqual(results.length, 1);
    });

    it('should select from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA-123', 1);
        await reg.selectReg('CA-123');
        let results = await reg.myData();
        assert.strictEqual(results.length, 1);
    });

    it('should update from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA-123', 1);
        await reg.insertReg('CA-123', 1);
        await reg.updateReg('CA-123', 2);

        let results = await reg.myData();
        assert.strictEqual(results.length, 2);
    });

    it('should filter from table', async function () {
        let reg = Registrations(pool);
        await reg.tryAddPlate('CA-9502', 1);
        let results = filterByTown('CA');
        assert.equal(results.length, 1);
    });


    after(function () {
        pool.end();
    })
});