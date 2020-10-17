const UserModel = require('../models/user');
const AppointmentModel = require('../models/appointment');

//Añadir citas nuevas

const AppointmentController = {
    async newappointment (req, res) {
        let user = await UserModel.findOne({
            email:req.body.email
        });
        if (!user.token){
            res.status(400).send({
                error,
                message: 'you must login first'
            })
        }else{
            try {
                const appointment = await AppointmentModel({
                    status: req.body.status,
                    date: req.body.date,
                    notes: req.body.notes,
                    iduser: user.token
                }).save();
                    res.status(201).send(appointment);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'There was a problem trying to register the appointment'
            })
        }
    }

},

//Cancelar citas
async cancel (req, res){
    try {
        await AppointmentModel.findByIdAndDelete({
            _id:req.params._id
        });
        res.status(201).send({
            message: `The appointment has been canceled successfully`
        });         
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error,
            message: 'There was a problem trying to deleted the appointment'
        })
    }
},

//Ver citas
async view (req, res){
    try {
        const appointment = await AppointmentModel.find({
            iduser: req.params.token
        });
        res.status(201).send({appointment});
        
    } catch (error) {
        res.status(500).send({
            error,
            message: 'There was a problem trying to view the appointments'
        })
    }
}

}

module.exports = CitaController;
