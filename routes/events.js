const { Router } = require('express');
const router = Router();
const { getEvents ,createEvent , updateEvent ,deleteEvent} = require('../controllers/events');
const {validationJWT} = require('../middlewares/validar-jwt');
const { validationCamps } = require('../middlewares/validar-camp');
const { isDate } = require('../helpers/isDate');
const   { check } = require('express-validator');
//get evets

router.use(validationJWT); //where the token is validated

//this function will return all events
router.get('/',getEvents);

router.post('/',
[
    check('title','the title is required').not().isEmpty(),
    check('start','the start date is required').custom( isDate),
    check('end','the end date is required').custom( isDate),

    validationCamps //this is the middleware that validates the fields of the event


],


    createEvent);

router.put('/:id',updateEvent);

router.delete('/:id',deleteEvent);
module.exports = router;

