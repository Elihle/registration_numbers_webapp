const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Registrations = require('./registrations');

let app = express();
let regNumbers = Registrations();


// handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));



app.get('/', function(req, res){
    res.render('home');
});

app.get('/add', function(req, res) {
    let input = req.body.input;
    let output = regNumbers.filterAllTown(input);
    res.render('home', output);
});

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});