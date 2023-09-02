const express = require('express');
const app = express();
const port = 8000;

app.listen(port, (err)=>{
    if(err){
        console.log(`An Error has occured in runing the server ${err}!`);
        return;
    }
    return console.log(`The express server is up and running on port : ${port}`);
})