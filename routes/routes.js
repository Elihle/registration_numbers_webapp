module.exports = function (services) {
   async function homeRoute(req, res) {
        try {
            res.render('home', {});
        } catch (err) {
            res.send(err.stack)
        }
    }

   async function addReg(req, res) {
        try {
            let reg = await req.params.reg;
            let output = selectReg(reg);
            res.render('home', output);
        } catch (err) {
            res.send(err.stack)
        }
    }

    return {
        homeRoute,
        addReg
    }
}
