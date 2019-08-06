/**
 * Setup connection to the database.
 **/
const mysql = require('mysql2')
const secrets = require('../secrets/secrets.json')

// For connecting to GoogleCloud MySQL database.
var connection = mysql.createConnection({
    host: "35.228.83.155",
    port: "3306",
    user: "adamskicool",
    password: secrets.MySQL_PASSWORD_Google_Cloud,
    database: "for_the_gamers"
});

// // For connecting to local database.
// var connection = mysql.createConnection({
//     host: "127.0.0.1",
//     port: "3306",
//     user: "root",
//     password: "password",
//     database: "clandoo"
// });

connection.connect()
module.exports = connection
