require('dotenv').config();

const express = require('express')
const expressLayout = require('express-ejs-layouts')
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const { isActiveRoute } = require('./server/helper/routeActive');


const app = express();
const port = 8000 || process.env.PORT;


// database connection

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(session({
    secret:'keyboard cat',
    resave:'false',
    saveUninitialized:'true',
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })

}))

app.use(methodOverride('_method'))

app.use(express.static('public'))



//templating engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/' , require('./server/route/main'));
app.use('/' , require('./server/route/admin'));


app.locals.isActiveRoute = isActiveRoute;




app.listen(port , ()=>{
    console.log(`app is listening on port ${port}`)
    
})