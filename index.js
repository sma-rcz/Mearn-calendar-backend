const path = require('path');

const express = require('express');
require('dotenv').config();

const cors = require('cors');
const {dbConection} = require('./database/config');
//console.log(process.env);

//create the server express instance

const app = express();
//conection database server
dbConection();


//CORS is protecting the server from other servers  on the requests
app.use(cors()); //CORS is a middleware that allows the server to accept requests from other servers  

//directory public 
app.use(express.static('public' )); //this elements is a middleware

//reading and parsing from body
app.use(express.json());

/* Rutes

//Todo:auth//creating /loggin , renew,
//Todo:CRUD: Events
*/ 
//Rutes  //endpoints
app.use('/api/auth' , require('./routes/auth')); //all files  exports from /routes/auth ability to /api/auth
app.use('/api/events' , require('./routes/events')); //all files  exports from /routes/events ability to /api/events

app.use('*' , (req, res) => {
    res.sendFile( path.join(__dirname, 'public/index.html'));
});

//hearing peticious
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port  ${process.env.PORT}`);
});