/**
 * Setup connection to the database.
 **/
const mysql = require('mysql2')
const secrets = require('../secrets/secrets.json')

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: secrets.MySQL_PASSWORD,
    database: "for_the_gamers"
});

connection.connect()
module.exports = connection
