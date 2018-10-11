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
            await services.insertReg(enterReg);

            res.redirect('/');
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function getAllTowns(req, res) {
        try {
            let selectTown = req.params.towns;
            console.log(selectTown);
            let filterTowns = await services.filterByTown(selectTown);

            res.render('home', {
                town: filterTowns
            })
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