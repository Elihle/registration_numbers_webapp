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
            let enterReg = await req.body.enterReg;
            let regNum = await services.insertReg(enterReg);

            if (regNum === '') {
                req.flash('info', 'Please enter registaration number');
            }
            if (regNum == false) {
                req.flash('info', 'Please enter correct registration number');
            }

            if (regNum == undefined) {
                req.flash("infoTwo", "Registration number already exits")
            }

            res.redirect('/');
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

    return {
        homeRoute,
        addReg,
        getAllTowns
    }
}