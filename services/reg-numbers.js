module.exports = function Registrations(pool) {
    async function checkReg() {
        let result = await pool.query('SELECT * FROM registrations');
        return result.rows;
    }

    async function getTowns() {
        let result = await pool.query('SELECT * FROM towns');
        return result.rows;
    }

    async function find_reg_id(town) {
        let town_tag = town.substring(0, 3).trim();
        let checkTags = await pool.query('SELECT id FROM towns WHERE town_tag=$1', [town_tag]);
        if (checkTags.rowCount === 0) {
            return 0;
        }
        return checkTags.rows[0].id;
    }

    async function isDuplicate(reg) {
        let found = await pool.query('SELECT * FROM registrations WHERE reg_number=$1', [reg]);
        if (found.rowCount > 0) {
            return true;
        } else {
            return false
        }
    }

    async function insertReg(reg) {
        let duplicateReg = await isDuplicate(reg);
        if (duplicateReg === true) {
            return 'exists';
        } else {
            let regId = await find_reg_id(reg);
            if (regId === 0) {
                return 'invalid';
            }
            await pool.query('INSERT INTO registrations (reg_number, reg_id) values ($1, $2)', [reg, regId]);
        }
    }
    async function selectReg(regNum) {
        let results = await pool.query('SELECT * FROM towns WHERE town_tag = $1', [regNum]);
        return results.rows;
    }

    async function updateReg(regNum, regId) {
        await pool.query('UPDATE registrations SET reg_number = $1 where reg_Id = $2', [regNum, regId]);
    }

    async function filterByTown(tagList) {
        if (tagList === 'All') {
            let selectedTown = await pool.query('SELECT reg_number FROM registrations');
            return selectedTown.rows;
        } else {
            let result = await pool.query('SELECT id FROM towns WHERE town_tag=$1', [tagList]);
            console.log(result.rowCount)
            let regNo = await pool.query('SELECT reg_number FROM registrations WHERE reg_id=$1', [result.rows[0].id]);
            console.log(regNo.rows);

            return regNo.rows;
        }
    }

    async function resetDb() {
        let results = pool.query('delete from registrations');
        return results;
    }

    return {
        checkReg,
        insertReg,
        selectReg,
        updateReg,
        filterByTown,
        getTowns,
        resetDb

    }
}