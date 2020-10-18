const router = require('express').Router();
const AppointmentController = require('../controllers/appointmentController');


//Endpoint de creación de cita
router.post('/newAppointment/:email', AppointmentController.newappointment);

//Endpoint de eliminación de cita
router.delete('/cancel/:_id', AppointmentController.cancel);

//Endpoint de citas pendientes
router.get('/view/:token_id', AppointmentController.view);




module.exports = router;

