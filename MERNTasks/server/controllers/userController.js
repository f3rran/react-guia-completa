const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.createUsuario = async (req,res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    //Extraer email y password
    const {email, password} = req.body;
    
    try {
        //Revisar usuario único
        let user = await User.findOne({email});

        if (user) {
            return  res.status(400).json({msg: "El usuario ya existe"});
        }

        //Crear nuevo usuario
        user = new User(req.body);

        //Hashear password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Guardar usuario
        await user.save();

        //Crear y firmar el JWT
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
        res.status(400).send("Hubo un error");
    }
}