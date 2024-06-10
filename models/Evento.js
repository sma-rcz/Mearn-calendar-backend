const { Schema,model} = require('mongoose');

/**
 * User schema for the database.
 *
 * @typedef {Object} UserSchema
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
const EventoSchema = Schema({
    title:{
        type: String,
        required: true
    },
    notes:{
        type: String
    },
    start:{
        type:Date,
        required: true
    },
    end:{
        type:Date,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId, //Rerence to the user
        ref:'Usuario',
        required: true
    }

});

EventoSchema.method('toJSON', function(){ //Method to return the object without the __v and the _id
    const {__v,_id, ...object} = this.toObject();//Destructuring the object
    object.id = _id;//Changing the name of the id
    return object; //Returning the object
});
module.exports = model('Evento', EventoSchema);