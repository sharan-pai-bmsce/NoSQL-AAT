const mongoose = require('mongoose');

customerSchema = new mongoose.Schema({
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
    DOB:{
        type: Date,
        required: true,
    },
    sex:{
        type: String,
        required: true
    },
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointments'
        }
    ],
    reports:[
        {
            reportId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Reports'
            },
            status: {
                type: String,
            },
            appointmentTime: {
                type: Date,
                required: true
            },
            categoryId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Categories'
            }
        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model('Customers',customerSchema)

