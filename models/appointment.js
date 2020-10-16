const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({

    status:{
        type:String,
        required:true
    },
    date:{
        type:Data,
        required:true
    },
    notes:{
        type:String,
    },
    userId:{
        type:String,
    }
})

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;