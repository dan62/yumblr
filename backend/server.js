// Importing of necessary modules
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
const env_reader = require('dotenv').config()
var cors = require('cors')

// variables for serving over HTTPS
/*var https = require('https');
const fs = require('fs');
var key = fs.readFileSync('SSL/private.key');
var cert = fs.readFileSync('SSL/primary.crt');
var ca = fs.readFileSync('SSL/intermediate.crt');

var options = {
  key: key,
  cert: cert,
  ca: ca
};
*/

app.use(cors())

// Initiating the port for the application to run
port = process.env.PORT || 3000;

// Listen to port (No SSL)
app.listen(port);

// Using SSL
// https.createServer(options, app).listen(port);

// Intro to API on startup
console.log('API server started on: ' + port);
console.log('Served Port: ' + port + '(PORT can be changed in .env or server.js) ');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Attempting to serve static files
//app.use(express.static('media'))
//app.use(express.static('files'))
//app.use('/media', express.static('media'))

// Declaring routes and registering routes
var routes = require('./routes/routes');
routes(app);

module.exports = app