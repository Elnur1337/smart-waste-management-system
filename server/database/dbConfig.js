//Libraries
require('dotenv/config');
const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'elnurdev',
    password: process.env.MYSQL_PASSWORD,
    database: "swms"
});
module.exports = database;