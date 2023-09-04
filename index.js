const express = require('express');
const cookieParser  = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');


app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayout);
    
app.use(express.static("./assets"));
// extract style and script from the sub pages to the layouts
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use('/', require("./routes"));

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");




app.listen(port, (err)=>{
    if(err){
        console.log(`An Error has occured in runing the server ${err}!`);
        return;
    }
    return console.log(`The express server is up and running on port : ${port}`);
})