// Abgewandelt von: http://mfikri.com/en/blog/nodejs-restful-api-mysql
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
require('dotenv').config();

// Parser for JSON
app.use(bodyParser.json());

// Swagger
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Create DB pool
var pool  = mysql.createPool({
    host     : process.env.SQL_HOST,
    user     : process.env.SQL_USER,
    password : process.env.SQL_PASSWORD,
    database : process.env.SQL_DATABASE
});

// Return all Users
app.get('/v1/orders',(request, response) => {
  let sql = "SELECT * FROM orders";
  let query = pool.query(sql, (error, results) => {
    //Somethings wrong interally
    if(error) return sendResponse(response, 500, error, null);
    // All good
    sendResponse(response, 200, null, results);
  });
});

// Return specific User
app.get('/v1/users/:id',(request, response) => {
  let sql = "SELECT * FROM userdata WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    //Somethings wrong interally
    if(error) return sendResponse(response, 500, error, null);
    // Id is unkown and no changes were made
    if(results.length < 1) return sendResponse(response, 404, "Not found.", null);
    // All good
    sendResponse(response, 200, null, results);
  });
});

// Create new User
app.post('/v1/users',(request, response) => {
  let data = request.body;
  let sql = "INSERT INTO userdata SET ?";
  let query = pool.query(sql, data,(error, results) => {
    // Missing or wrong attributes used
    if(error) return sendResponse(response, 400, error.sqlMessage, null);
    // All good
    sendResponse(response, 200, null, results);
  });
});

// Update specific User
app.put('/v1/users/:id',(request, response) => {
  let data = request.body;
  let sql = "UPDATE userdata SET ? where id="+request.params.id;
  let query = pool.query(sql, data,(error, results) => {
    // Missing or wrong attributes used
    if(error) return sendResponse(response, 400, error.sqlMessage, null);
    // Id is unkown and no changes were made
    if(results.affectedRows < 1) return sendResponse(response, 404, "User not found.", null);
    // All good
    sendResponse(response, 200, null, results.message);
  });
});

// Delete specific User
app.delete('/v1/users/:id',(request, response) => {
  let sql = "DELETE FROM userdata WHERE id="+request.params.id+"";
  let query = pool.query(sql, (error, results) => {
    //Somethings wrong interally
    if(error) return sendResponse(response, 500, error.sqlMessage, null);
    // Id is unkown and no changes were made
    if(results.affectedRows < 1) return sendResponse(response, 404, "User not found.", null);
    // All good
    sendResponse(response, 200, null, results);
  });
});

// Catch wrong JSON in requests
app.use(function (error, request, response, next) {
  if (error instanceof SyntaxError) {
    sendResponse(response, 400, "Invalid JSON.", null);
  } else {
    next();
  }
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});

function sendResponse(response, status, error, result) {
  response.status(status).send(JSON.stringify({"status": status, "error": error, "result": result}));
}
