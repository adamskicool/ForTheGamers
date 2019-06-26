/**
 * Setup connection to the database.
 **/
const mysql = require('mysql2')
const secrets = require('../secrets/secrets.json')

var connection = mysql.createConnection({
    host: "35.228.83.155",
    port: "3306",
    user: "adamskicool",
    password: secrets.MySQL_PASSWORD_Google_Cloud,
    database: "for_the_gamers"
});

connection.connect()
module.exports = connection
