module.exports = function Registrations(pool) {
    async function checkReg() {
        let result = await pool.query('SELECT * FROM registrations');
        return result.rows;
    }

    async function getTowns() {
        let result = await pool.query('SELECT * FROM towns');
        return result.rows;
    }

    async function insertReg(reg) {
        let regId = await find_reg_id(reg);
        await pool.query('INSERT INTO registrations (reg_number, reg_id) values ($1, $2)', [reg, regId]);
    }

    async function find_reg_id(town) {
        let town_tag = town.substring(0, 3).trim();
        let checkTags = await pool.query('SELECT id FROM towns WHERE town_tag=$1', [town_tag]);
        if (checkTags.rowCount === 0) {
            return 0;
        }
        return checkTags.rows[0].id;
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
            let selectedTown = await pool.query("SELECT reg_number FROM registrations");
            return selectedTown.rows;
        } else {
            let regTag = tagList.substr(0, 3).trim();
            console.log(regTag);
            let result = await pool.query('SELECT id FROM towns WHERE town_tag=$1', [regTag]);
            let regNo = await pool.query('SELECT reg_number FROM registratons WHERE reg_id=$1', [result.rows[0].id]);
            return regNo.rows;
        }
    }

    // async function filterByTown(regNum) {
    //     let filter = await pool.query("SELECT * from towns where town_name LIKE $1" ,['%' + regNum +' %']);
    //     return filter.rows;
    // }

  return { 
        checkReg,
        insertReg,
        selectReg,
        updateReg,
        filterByTown,
        getTowns

    }
}

