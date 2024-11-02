/*
Connecting handlers(controllers), database, create models, body parser
and create routes together
*/
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:gemini2205@cluster0.fchh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {useNewUrlParser: true}
);
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);    
app.listen(port);
app.use((req,res) => {
    req.statusCode(404).send({url: `${req.originalUrl} not found`});
});
console.log(`Server started on: ' + ${port}`);