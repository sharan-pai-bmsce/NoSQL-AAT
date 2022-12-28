const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true,
    },
    attributes: [
        {
            test: {
                type: String,
                required: true,
            },
            isSubheading:{
              type: Boolean, 
              required: true 
            },
            unit: {
                type: String
            },
            reference: {
                type: String,
            }
        }
    ]
});

module.exports = mongoose.model('Categories',categorySchema);