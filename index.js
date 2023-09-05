const express = require('express');
const cookieParser  = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

// for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayout);
    
app.use(express.static("./assets"));
// extract style and script from the sub pages to the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    name : 'social',
    // Todo change the secret before deployment
    secret : "something",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/', require("./routes"));


app.listen(port, (err)=>{
    if(err){
        console.log(`An Error has occured in runing the server ${err}!`);
        return;
    }
    return console.log(`The express server is up and running on port : ${port}`);
})