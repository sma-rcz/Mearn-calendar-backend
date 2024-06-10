const { response } = require('express');
const jwt = require('jsonwebtoken');

const  validationJWT  =  ( req,res = response,next)=>{

    //x-token headers
    const token = req.header('x-token');
  //  console.log(token);

  //if there is no token 
  if(!token){
     return res.status(401).json({
         success: false,
         msg: 'there is no token in the request',
     });
  }
  
  try {
    const { uid,name }= jwt.verify(
        token,
        process.env.SCRET_JWT_SEED
    );
    //console.log(payload);
    req.uid = uid;
    req.name = name;
    
  } catch (error) {
    return res.status(401).json({
        success:false,
        msg: 'token is not valid'
    })
    
  }

    next();

}

module.exports = {
    validationJWT ,
}