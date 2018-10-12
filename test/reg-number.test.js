const assert = require('assert');
const Registrations = require('../services/reg-numbers');
const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder@localhost:5432/reg_numbers';
const pool = new Pool({
    connectionString,
    ssl: useSSL
});
describe('Registration Numbers', function () {

    beforeEach(async function () {
        await pool.query("delete from registrations;");
    });

    it('should return 0', async function () {
        let reg = Registrations(pool);
        let results = await reg.checkReg();
        assert.equal(results.length, 0);
    });

    it('should insert from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA', 1);
        let results = await reg.checkReg();
        assert.strictEqual(results.length, 1);
    });

    it('should select from table', async function () {
        let reg = Registrations(pool);
        await reg.insertReg('CA 123', 1);
        await reg.selectReg('CA 123');
        let results = await reg.checkReg();
        assert.strictEqual(results.length, 1);
    });

    // it('should filter from table', async function () {
    //     let reg = Registrations(pool);
    //     await reg.insertReg('CAW 599', 1);
    //     await reg.insertReg('CK 237', 1);
    //     await reg.filterByTown('CAW');
    //     let results = await reg.checkReg();
    //     assert.strictEqual(results.length, 1);

    // });

    after(function () {
        pool.end();
    })
});