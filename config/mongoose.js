const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/social_development_db");

const db  = mongoose.connection;

db.on("Erro", console.error.bind(console,'Error in connecting the db'));

db.once('open',()=>{
    console.log('The db connection is established!');
});

module.exports = db;