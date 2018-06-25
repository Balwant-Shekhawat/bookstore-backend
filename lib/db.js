const config = require('./../config/config');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: config.mysqlHost,
    port: config.mysqlPort,
    user: config.mysqlUser,
    password: config.mysqlPassword,
    database: config.mysqlDB
});

connection.connect();

module.exports = connection;