const mongoose = require('mongoose');

/**
 * Connects to the database using the provided connection string.
 * @async
 * @function dbConection
 * @throws {Error} Throws an error if there is an issue connecting to the database.
 */
const dbConection = async()=>{
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        throw new Error(`Error while connecting to Mongoose ${error}`);
        
    }
}
module.exports = {
    dbConection,
}