const UserModel = require('../models/user');
const bcrypt = require("bcryptjs");

//Registrar usuario
const UserController = {
    async registration (req, res) {
    let bodyData = req.body;
    let regExEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let regExPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    
    if(!regExEmail.test(bodyData.email)){
        res.send({
            message: "The email entered is not valid"
        });
        return;
    }

    if(!regExPassword.test(bodyData.password)){
        res.send({
            message: "The password entered is not valid"
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

         res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'There was a problem trying to register the client'
            })
        }
    },
//Login de usuarios
    async login (req, res) {
    let userFound = await UserModel.findOne({
        email: req.body.email
    });

    if (!userFound) {
        res.send({
            message: "User does not exist"
        })
    } else {

        let passwordOk = await bcrypt.compare(req.body.password, userFound.password);

        if (!passwordOk) {
            res.send({
                message: "Bad credentials"

            })
        } else {
            userFound.token = userFound._id;
                await userFound.save();
                res.send({
                    nombre: userFound.nombre,
                    email: userFound.email
                })
            }
            
        }

    },

//Logout de usuarios
    async logout (req, res) {

        try {
            await UserModel.findOneAndUpdate (req.body.email, {token:null}, {new:true, useFindAndModify:false});
             res.status(201).send({
                 message: 'Logout is OK'
             });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'There was a problem trying to logout the client'
            })            
        }
    }

}

    module.exports = UserController;
