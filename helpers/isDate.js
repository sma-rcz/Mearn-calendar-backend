const  moment = require('moment');

const isDate = (value /* {  req,location,path}*/) => {
    //  console.log(value);
    //  console.log(req,location,path);
    if (!value) {  //if the value is empty
        return false; //return false
    }
    const date = moment(value); //here the date is taken
    if (date.isValid()) { //if the date is valid
        return true; //return true    
    } else {
        return false; //return false
    }

}
module.exports = {
    isDate,
}