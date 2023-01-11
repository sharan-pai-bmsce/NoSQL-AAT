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
    signUrl:{
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

module.exports = mongoose.model('Doctors',doctorSchema);