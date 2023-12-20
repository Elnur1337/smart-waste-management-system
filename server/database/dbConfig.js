//Libraries
require('dotenv/config');
const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'elnurdev',
    password: process.env.MYSQL_PASSWORD,
    database: "swms",
    multipleStatements: true
});
module.exports = database;