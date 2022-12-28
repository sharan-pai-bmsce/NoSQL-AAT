const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');


const auth = require('./routes/auth');
const admin = require('./routes/admin');
const users = require('./routes/user');
app = express();

app.use(bodyParser.json({extended: false}));

// app.use('/login',(req,res,next)=>{
//     console.log("Login");
//     return res.json({message:"Hello World"})
// })
app.use((req,res,next)=>{
    req.userId = '639a1c5a065326c917ee60ee';
    next();
})
app.use(auth)
app.use('/admin',admin)
app.use(users)

mongoose.connect('mongodb://localhost:27017/NoSQL-AAT').then(()=>{
    console.log("Server Connected");
    app.listen(3000)
}).catch((err)=>{
    console.log(err);
})