const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.authenticateUser = async  (req,res) => {

     //Revisar si hay errores
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array()});
     }

     //Extraer el email y contraseña
     const {email, password} = req.body;

     try {
         //Revisar que sea un usuario registrado
         let user = await User.findOne({email});
         if (!user) {
             return res.status(400).json({msg: 'El usuario no existe'});
         }

         //Revisar el password
         const dbPass = await bcryptjs.compare(password, user.password);
         if (!dbPass) {
             return res.status(400).json({msg: "La contraseña es incorrecta"});
         }

         //Si todo es correcto se crea JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Firmar el token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if (error) throw error;

            //Mensaje de confirmación
            res.json({token});
        })
     } catch (error) {
         console.log(error);
     }
}