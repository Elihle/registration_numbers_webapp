const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require("express-flash");
const bodyParser = require('body-parser');
const pg = require("pg");
const Services = require('./services/reg-numbers');
const Routes = require('./routes/routes');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder@localhost:5432/reg_numbers';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

let app = express();
let services = Services(pool);
let routes = Routes(services);

app.use(session({
    secret: 'registration numbers',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

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

app.get('/', routes.homeRoute);
app.post('/registrations', routes.addReg);
app.get('/filter/:towns', routes.getAllTowns);
app.get('/reset', routes.clearDb);

let PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});