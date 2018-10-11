module.exports = function (services) {
   async function homeRoute(req, res) {
        try {
            let town = await services.checkReg();
            console.log(town);
            
             res.render('home', {town});
        } catch (err) {
            res.send(err.stack)
        }
    }

   async function addReg(req, res) {
        try {
            let enterReg = await req.body.enterReg;
            //  console.log('insert reg', enterReg);
             await services.insertReg(enterReg);

            res.redirect('/');
        } catch (err) {
            res.send(err.stack)
        }
    }

    async function getAllTowns(req, res) {
        try {
            let selectTown = req.params.towns;
            let filterTowns = await services.filterByTown(selectTown);

            console.log('towns',filterTowns);
            res.render('home', filterTowns)
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
