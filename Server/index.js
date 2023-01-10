const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const auth = require('./routes/auth');
const admin = require('./routes/admin');
const users = require('./routes/user');
const doctors = require('./routes/doctor');
app = express();

mongoose.set('strictQuery', false);

app.use(bodyParser.json({ extended: false }));

// app.use('/login',(req,res,next)=>{
//     console.log("Login");
//     return res.json({message:"Hello World"})
// })

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    // This header is to accept which request methods are allowed
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    // This header is to accept what header info can be accessed and changed by the client.
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();

});

app.use(auth)
app.use('/admin', admin)
app.use('/doctor', doctors);
app.use(users)

mongoose.connect('mongodb://localhost:27017/NoSQL-AAT').then(() => {
    console.log("Server Connected");
    app.listen(3000)
}).catch((err) => {
    console.log(err);
})