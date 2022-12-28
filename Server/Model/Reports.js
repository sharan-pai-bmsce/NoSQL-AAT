const { default: mongoose } = require("mongoose");

const Report = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customers'
    },
    details: {
        type: Object,
        required: true,
    },
    processing:{
        type:Boolean,
        required: true,
    },
    signed:{
        type: Boolean,
        required: true,
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor' 
    }
})