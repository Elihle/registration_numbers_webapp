module.exports = function (services) {
    function homeRoute(req, res) {
        try {
            res.render('home', {});
        } catch (err) {
            res.send(err.stack)
        }
    }

    function addReg(req, res) {
        try {
            let reg = req.body.reg;
            let output = insertReg(reg);
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