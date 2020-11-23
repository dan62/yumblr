// Importing of required modules
'user strict';
var mysql = require('mysql');

// Definning connection to database 

var connection = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER ,
    password : process.env.DB_USER_PASSWORD,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT
});


// Exporting of module
module.exports = connection;