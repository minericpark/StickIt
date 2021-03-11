const express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/profiles', require('./profiles_api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log("Server is running on port "+PORT));