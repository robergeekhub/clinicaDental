const router = require('express').Router();
const UserController = require('../controllers/userController');

//Endpoint de registro
router.post('/registration', UserController.registration);

//Endpoint de Login
router.post('/login', UserController.login);

//Endpoint Logout
router.put('/logout', UserController.logout);


module.exports = router;