const { default: mongoose } = require("mongoose");

const ScheduleSchema = mongoose.Schema({
    time:{
        type: mongoose.Schema.Types.Number,
        required: true
    },
    count: {
        type: mongoose.Schema.Types.Number,
        required: true,
    }
})

module.exports = mongoose.model('Schedule',ScheduleSchema);