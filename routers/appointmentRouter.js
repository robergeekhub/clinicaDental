const router = require('express').Router();
const UserController = require('../controllers/userController');

//Endpoint de registro
router.post('/registro', ClienteController.registro);
//Endpoint de Login
router.post('/login', ClienteController.login);
//Endpoint Logout
router.put('/logout', ClienteController.logout);


module.exports = router;
