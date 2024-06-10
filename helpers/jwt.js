const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) with the provided user ID and name.
 * @param {string} uid - The user ID.
 * @param {string} name - The user name.
 * @returns {Promise<string>} A promise that resolves to the generated JWT.
 */
const generateJWT = ( uid,name ) => {
    return new Promise( (resolve, reject) => {
        const payload = { uid,name };
        jwt.sign(payload,process.env.SCRET_JWT_SEED,{ //this is my secret key
            expiresIn: '2h' //duration of the token
        },( err,token) =>{
            //if there is an error the token could not be generated
            if(err){
                console.log(err);
                reject('token could not be generated'); // 
            }else{ //if the token is generated
                resolve(token);
            }
        }  )
    })

}

module.exports = {
    generateJWT,
}