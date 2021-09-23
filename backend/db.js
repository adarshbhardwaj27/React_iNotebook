const mongoose = require('mongoose')

const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo Succesfully");
    })
}
module.exports = connectToMongo;