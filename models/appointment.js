const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({

    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    iduser:{
        type:String,
    }
})

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);

module.exports = AppointmentModel;