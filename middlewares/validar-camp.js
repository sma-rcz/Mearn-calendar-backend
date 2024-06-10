const {response}= require('express'); //this element help autocomplete
const {validationResult} = require('express-validator');//here takes the results from routes


/**
 * Middleware function to validate request parameters using express-validator.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object with error details if validation fails.
 */
const validationCamps = (req ,res = response,next) => {

    const errors = validationResult(req);
   //console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({//status
            success: false,
            msg: errors.mapped(), //mapping error
        });
    }


    next();//the next ejection the next middleware
}

module.exports = {
    validationCamps,
}