const express = require('express');
const cookieParser  = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

// for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = new require('./config/passport-local-strategy');
const passportJWT = new require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth-strategy');



// mongoStore
const MongoStore = require('connect-mongo');

// sass middleware
const sass = require('sass');
const sassMiddleware = require('sass-middleware');

const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

// sass
app.use(
    sassMiddleware({
      src: './assets/scss', // Source directory
      dest: './assets/css', // Destination directory
      debug: true,
      sourceMap: true,
      outputStyle: 'extended',
      prefix: '/css',
    })
  );

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayout);
    
app.use(express.static("./assets"));

// making the uploaded file available in the browser
app.use('/uploads', express.static(__dirname +'/uploads'));

// extract style and script from the sub pages to the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongostore is use to store the session cookie in db
app.use(session({
    name : 'social',
    // Todo change the secret before deployment
    secret : "something",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl : 'mongodb://127.0.0.1:27017/social_development_db',
        autoRemove: 'disabled'
      },
      function(err){
        console.log(err || "connect-mongo setup is done");
      })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleware.setFlash);

// use express router
app.use('/', require("./routes"));


app.listen(port, (err)=>{
    if(err){
        console.log(`An Error has occured in runing the server ${err}!`);
        return;
    }
    return console.log(`The express server is up and running on port : ${port}`);
})