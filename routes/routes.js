module.exports = function (services) {
    async function homeRoute(req, res) {
        try {
            let towns = await services.getTowns();
            let town = await services.checkReg();

            res.render('home', {
                town,
                towns
            });
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function addReg(req, res) {
        try {
            let enterReg = req.body.enterReg;
            if (enterReg == '' || enterReg == undefined) {
                req.flash('info', 'Please enter registration number');
            } else {
                let regNum = await services.insertReg(enterReg);
                if (regNum === 'invalid') {
                    req.flash('info', 'Please enter registration numbers from the following towns:Cape Town, George, Stellenbosch or Paarl ');
                }
                if (regNum === 'exists') {
                    req.flash('info', 'Registration number already exists');
                }
            }

            res.redirect("/");


        } catch (err) {
            res.send(err.stack)
        }
    }

    async function getAllTowns(req, res) {
        try {
            let selectTown = req.params.towns;
            let towns = await services.getTowns();
            let filterTowns = await services.filterByTown(selectTown);

            res.render('home', {
                towns,
                town: filterTowns
            });
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function clearDb(req, res) {
        try {
            let reset = await services.resetDb();
            let towns = await services.getTowns();

            res.render('home', {
                reset,
                towns
            });
        } catch (err) {
            res.send(err.stack);
        }
    }

    return {
        homeRoute,
        addReg,
        getAllTowns,
        clearDb
    }
}