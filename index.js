const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
require("dotenv").config();
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const systemConfig = require("./config/system");

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
    extended: false
}))
//flash
app.use(cookieParser('asdlfkhasdfiuwer'));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());

//ket noi database
const database = require("./config/database");

database.connect()

const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");

//Nhung file tinh
app.use(express.static(`${__dirname}/public`));

//su dung template engine
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//Route
route(app);
routeAdmin(app);


// App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;


app.listen(port, () => {
    console.log(`Web da chay tren cong ${port}`);
});