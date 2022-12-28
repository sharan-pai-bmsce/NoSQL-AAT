const mongoose = require('mongoose');

doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    mobile:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    degreeUrl:{
        type: String,
        required: true,
    }, 
    degree: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

mongoose.model('Doctor',doctorSchema)

