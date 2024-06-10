/**
 * Routes from users /Auth
 * host + /api/auth
 * 
 */


/*const express = require('express');
const router = express.Router*/

/**
 * Importing functionality from the auth controllers.
 * @module auth
 */

const { Router } = require('express'); //
const {check } = require('express-validator'); //mildeware for validations

const router = Router();

const  {creatingUser ,loginUser,reValidationToken} = require('../controllers/auth'); //here  extracting functionality from controllers carpet
const { validationCamps } = require('../middlewares/validar-camp');
const {  validationJWT} = require('../middlewares/validar-jwt' );




router.post('/new',
[//middlewares 
    //the name is obligatory  and not acepted void here
    check('name', ' the name is required ').not().isEmpty(),
    check('email', ' the email is required ').isEmail(),// the email is required @
    check('password', ' the password is required ').isLength({ min: 6 }), //the password is required min 6 characters
    validationCamps
],
creatingUser ); //this endpoint is used to create a new user

router.post('/',[
    check('email', ' the email is required ').isEmail(),// the email is required @
    check('password', ' the password is required ').isLength({ min: 6 }), //the password is required min 6 characters
    validationCamps
    
]
,
loginUser); //this  endpoint is used to create a new user

router.get('/renew',validationJWT ,reValidationToken  );// this endpoint is used to renovetions and validation tokens

module.exports = router;