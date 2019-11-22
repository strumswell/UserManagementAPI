const mysql = require('mysql');
require('dotenv').config();

// Connection pool
var pool  = mysql.createPool({
      host     : process.env.SQL_HOST,
      user     : process.env.SQL_USER,
      password : process.env.SQL_PASSWORD,
      database : process.env.SQL_DATABASE
});

module.exports = pool;
