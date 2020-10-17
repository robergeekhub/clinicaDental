const UserModel=require('../models/User');
const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");
const fs=require('fs');

//Registrar usuario
const registerUser = async (req, res) => {
    
    let bodyData = req.body;
    let regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regExPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    
    if(!regExEmail.test(bodyData.email)){
        res.send({
            message: "El email introducido no es válido"
        });
        return;
    }

    if(!regExPassword.test(bodyData.password)){
        res.send({
            message: "El password introducido no es válido"
        });
        return;
    }

    //encriptado de password
     let hashPass = await bcrypt.hash(bodyData.password, 10);

     try {
		
        const user = await new UserModel({
            username: bodyData.username,
            lastname: bodyData.lastname,
		    email: bodyData.email,
            password: hashPass,
            phone: bodyData.phone

         }).save();

        res.send({
            message: "Account created successfully.",
            username: user.username
        });

    } catch (err) {
        
        if (err.code === 11000) { // E11000 duplicate key error (unique true)
			
			res.status(409); // conflict
			res.send({
				error: "Email already used."
			});
			
		} else {
			
			res.send(err);
			
		}		
	};
};

//Login de usuarios
const loginUser = async (req, res) => {
    let user = await UserModel.findOne({
        email: req.body.email
    });

    if (!user) {
        res.send({
            message: "No existe el usuario"
        })
    } else {

        let passwordOk = await bcrypt.compare(req.body.password, user.password);

        if (!passwordOk) {
            res.send({
                message: "Credenciales incorrectas"

            })
        } else {
            res.send({
                firstname: user.firstname,
                email: user.email
            });
            user.token = user._id
            await user.save();
        }
    }
},

//Logout de usuarios
const logoutUser = async (req, res) => {

        try {
            const token = req.headers.authorization;
    
            let logoutUser = await UserModel.findOne({ token: token });
    
            logoutUser.token = null;
            logoutUser.save();
    
            res.send('Has cerrado sesión.')
    
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'No se ha podido cerrar sesión.' });
        }
    
    };

    module.exports = UserController;
