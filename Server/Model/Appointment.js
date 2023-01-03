const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customers'
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    tests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Categories'
        }
    ]
});

module.exports = mongoose.model('Appointments',AppointmentSchema);