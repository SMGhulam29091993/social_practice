const express = require('express');
const app = express();
const port = 8000;

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