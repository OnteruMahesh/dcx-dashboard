const config = require('./db.config');
const mongoose = require('mongoose');

const dbConn = async () => {
    try{
        await mongoose.connect(config.uri)
        var status = mongoose.connection.readyState;
        if(status == 1){
            console.log("Connected to database");
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = dbConn;