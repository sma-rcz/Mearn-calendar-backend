const express = require('express'); //this using library that is recharged 
//care is necessary import this libray from helpers with autocomplete in js
const  bcript = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generateJWT } =  require('../helpers/jwt');
 


//Note: Is care  remembered that  req is the that people want to solcitude

//Note:But the res is the us ansewards

/**
 * Creates a new user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the user is created.
 */
const creatingUser =  async (req, res =express.response) => {

    //console.log(req.body)
    const { email,password  } = req.body //detruturing elments req.body  
    try {
        let usuario = await  Usuario.findOne({ email: email});
        console.log(usuario);
        if(usuario){
            return res.status(400).json({   //success
                success: false,
                msg: 'user already exists with this email',
            });
        }

        
        usuario =  new Usuario(req.body);
        //Encripting password  //note:beetween high level of encryption ,high complexity of hashing algorithm
        const salt = bcript.genSaltSync(10);//this  are the times  or niveles of the encrypted password
        usuario.password = bcript.hashSync(password, salt);

        await usuario.save();
        //generate jwt
        const  token =  await generateJWT(usuario.id,usuario.name); //generating token

        res.status(201).json({   //success
            success: true,
            uid:usuario.id,
            name:usuario.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'plese call the admin service',
        });
        
    }
  

}


//this function is called when the user need to login
/**
 * Logs in a user with the provided email and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the user is logged in or rejects if an error occurs.
 */
const loginUser = async (req, res = express.response) => {

    const { email,password} = req.body; //detruturing elments req.body 
    try {


        let usuario = await  Usuario.findOne({  email});
        console.log(usuario);
        //this if is called when the user is not found
        if(!usuario){
            return res.status(400).json({   //success
                success: false,
                msg: 'user is not exists with this email',
            });
        }
        const validPassword =  bcript.compareSync(password,usuario.password); //here is compared the password with the password of the user
        //this if is called when the password is not correct
        if(!validPassword){
            return res.status(400).json({
                success: false,
                msg: 'password is incorrect',
            });
        }
        //generating token
        const token = await generateJWT(usuario.id,usuario.name);

            res.json({
                success: true,
                uid: usuario.id,
                name: usuario.name,
                token,
            })



        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'plese call the admin service',
        });
        
    }

    /*
    res.status(200).json({  //status response from server successfully
        success: true,
        msg: 'loginUser',
        email,
        password,
    });*/
}




const reValidationToken = async (req, res = express.response) => {
        const {uid,name} = req;
        /*
        const uid = req.uid;
        const name = req.name;*/
        //generating token and return in this petion
        const token = await generateJWT(uid,name);

      
        //console.log('is need /')
        //  res.send('Hello World');
        res.json({
            success: true,
            token
        });

    
};


module.exports = {
    creatingUser,
    loginUser,
    reValidationToken,
};