/*
Connecting handlers(controllers), database, create models, body parser
and create routes together
*/
//import library/module
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');

mongoose.Promise = global.Promise; //set promise to global
mongoose.connect('mongodb+srv://admin:gemini2205@cluster0.fchh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {useNewUrlParser: true}
);
const port = process.env.PORT || 3000;
const app = express(); //Initializing an Express application
app.use(cors()); //to allow requests from other origins
app.use(bodyParser.urlencoded({extended:true})); //Parsing URL-encoded data sent with requests
app.use(bodyParser.json()); //Parsing JSON data sent with requests

routes(app);    //Loading the application's routes
app.listen(port);
app.use((req,res) => { //Sends a JSON response indicating that the requested URL was not found
    req.statusCode(404).send({url: `${req.originalUrl} not found`});
});
console.log(`Server started on: ' + ${port}`);