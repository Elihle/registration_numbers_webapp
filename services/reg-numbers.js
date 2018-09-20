module.exports = function Registrations(pool) {
    async function myData () {
        let result = await pool.query('select * from towns');
        return result.rows;
    }

    async function insertReg(reg, regId) {
        await pool.query('INSERT INTO registrations (reg_number, reg_id) values ($1, $2)', [reg, regId]);

    }

    async function selectReg (regNum) {
        let results = await pool.query('select * from towns where town_name = $1', [regNum]);
        return results.rows;
    }


    async function filterByTown(regNum) {
        let filter = await pool.query("SELECT * from towns where town_name LIKE $1"%regNum%"");
        return filter.rows;
    }

    return {
        myData,
        insertReg,
        selectReg,
        filterByTown
    }
    
}