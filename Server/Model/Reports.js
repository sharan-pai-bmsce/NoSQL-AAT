const { default: mongoose, model } = require("mongoose");

const Report = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customers'
    },
    testId: {
        type: mongoose.Types.ObjectId,
        ref: 'Categories'
    },
    details: {
        type: Object,
    },
    processing:{
        type:Boolean,
        default: false,
        required: true,
    },
    signed:{
        type: Boolean,
        default: false,
        required: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctors' 
    },
    appointmentTime:{
        type: Date
    }
});

module.exports = mongoose.model('Reports',Report);