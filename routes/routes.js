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
             console.log(enterReg);
             await services.insertReg(enterReg);

            res.redirect('/');
        } catch (err) {
            res.send(err.stack)
        }
    }

    // async function getAllTowns(req, res) {
    //     try {
    //         let filterTowns = await regNums.getAllTowns(towns); 
    //     } catch (err) {
    //         res.send(err.stack)
    //     }
    // }

    return {
        homeRoute,
        addReg
    }
}
















//  I wish I was able to communicate the thoughts I hold
//  Sometimes I wish I was different
//  I wish I could die
//  I am useless
//  I hate myself sometimes
//  I always wonder why God created me in the first place
//  Do you ever wonder what your purpose in life is?
//  Do you ever feel useless sometimes?
//  Do you ever want to cry but no tears are coming out?
//  