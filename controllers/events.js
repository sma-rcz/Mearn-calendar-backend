const { response } = require('express');
const Evento = require('../models/Evento');
const e = require('express');


/**
 * Get all events.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the response JSON.
 */
const getEvents = async (req, res = response) => {

    const events = await Evento.find()              //here can be added the query to filter the events or  to pages the events
                                .populate('user','name');
  

    try {
        res.json({
            ok: true,
            events
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'please call the admin service'
        })
        
    }

}


const createEvent = async (req ,res =response ) =>{

    const event = new Evento(req.body); //Creating the event object

    try {
        event.user = req.uid;
        const eventSaved = await event.save();
        res.json({
            ok:true,
            event:eventSaved,
        
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'please call the admin service'
        
        })
        
    }
    /*
    //verifiqued that having the event
    console.log(req.body);

    res.json({
        ok:true,
        msg:'create event'
    })*/
}

const updateEvent =  async( req,res= response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;
    

    try {
        const event = await Evento.findById(eventoId);
        if(!event){
            return res.status(404).json({ //if the event is not found
                ok:false,
                msg:"id not found"
            });
        }
        //if give muchs tokens invalid is posible bloquin the user ip
        if(event.user.toString() !== uid){ //if the user is not the owner of the event
            return res.status(401).json({
                ok:false,
                msg: "you don't have the privilege to edit this event"
            });

        }
        const newEvent = {
            ...req.body, //all the data that comes from the body
            user:uid //the user that is updating the event
        }                                   //first argument is the id of the event, second argument is the new event, third argument is to return the new event
        const eventupdated = await Evento.findByIdAndUpdate(eventoId,newEvent , {new:true}); //updating the event 
        res.json({
            ok:true,
            envet:eventupdated,
        })




    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"please call the admin service"
        })
    }


}

const deleteEvent = async (req,res=response)=>{
    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        const event = await Evento.findById(eventoId);
        if(!event){
            return res.status(404).json({ //if the event is not found
                ok:false,
                msg:" is don`t exist event with this id"
            });
        }
        //if give muchs tokens invalid is posible bloquin the user ip
        if(event.user.toString() !== uid){ //if the user is not the owner of the event
            return res.status(401).json({
                ok:false,
                msg: "you don't have the privilege to  delete this event"
            });

        }
        const eventDeleted = await Evento.findByIdAndDelete(eventoId); //deleting the event
        
        res.json({
            ok:true,
            event:eventDeleted,
        })

        


        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"please call the admin service"
        })
        
    }
}

/*
{
ok: true,
msg:'get events'
}
*/

/**
 * 
 * {
 * ok:true,
 * msg:'create event'
 * }
 */

/*
{
ok:true,
msg:'update event'
}
*/

/**
 * {
 * ok:true,
 * msg:'delete event'
 * }
 */

module.exports = {
   getEvents,
   createEvent,
   updateEvent,
   deleteEvent
}