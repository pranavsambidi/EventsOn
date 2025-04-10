const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Database connected")
})
.catch((err)=>{
    console.log("Error connecting to database")
    console.log(err)
})