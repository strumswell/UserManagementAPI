// Abgewandelt von: http://mfikri.com/en/blog/nodejs-restful-api-mysql
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// Parser for JSON
app.use(bodyParser.json());

// Create DB pool
var pool  = mysql.createPool({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

// Return all Users
app.get('/api/v1/users',(request, response) => {
  let sql = "SELECT * FROM userdata";
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 500, error, null);
    sendResponse(response, 200, null, results);
  });
});

// Return specific User
app.get('/api/v1/users/:id',(request, response) => {
  let sql = "SELECT * FROM userdata WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    if(error || results.length < 1) return sendResponse(response, 404, "Not found.", null);
    sendResponse(response, 200, null, results);
  });
});

// Create new User
app.post('/api/v1/users',(request, response) => {
  let data =
    {
      forename: request.body.forename,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    };
  let sql = "INSERT INTO userdata SET ?";
  let query = pool.query(sql, data,(error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    sendResponse(response, 200, null, results);
  });
});

// Update specific User
app.put('/api/v1/users/:id',(request, response) => {
  let body = request.body;
  let sql = "UPDATE userdata SET forename='"+body.forename+"', name='"+body.name+"', email='"+body.email+"' WHERE id="+request.params.id;
  if (body.forename === undefined || body.name === undefined || body.email === undefined) {
    return sendResponse(response, 400, "Missing attributes. (forename, name, email)", null);
  }
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    sendResponse(response, 200, null, results);
  });
});

// Update forname of specific User
app.put('/api/v1/users/:id/forename',(request, response) => {
  let sql = "UPDATE userdata SET forename='"+request.body.forename+"' WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    if(request.body.forename === undefined) return sendResponse(response, 400, "Missing attribute forename.", null);
    sendResponse(response, 200, null, results);
  });
});

// Update name of specific User
app.put('/api/v1/users/:id/name',(request, response) => {
  let sql = "UPDATE userdata SET name='"+request.body.name+"' WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    if(request.body.name === undefined) return sendResponse(response, 400, "Missing attribute name.", null);
    sendResponse(response, 200, null, results);
  });
});

// Update email of specific User
app.put('/api/v1/users/:id/email',(request, response) => {
  let sql = "UPDATE userdata SET email='"+request.body.email+"' WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    if(request.body.email === undefined) return sendResponse(response, 400, "Missing attribute email.", null);
    sendResponse(response, 200, null, results);
  });
});

// Update password of specific User
app.put('/api/v1/users/:id/password',(request, response) => {
  let sql = "UPDATE userdata SET password='"+request.body.password+"' WHERE id="+request.params.id;
  let query = pool.query(sql, (error, results) => {
    if(error) return sendResponse(response, 400, error, null);
    if(request.body.password === undefined) return sendResponse(response, 400, "Missing attribute password.", null);
    sendResponse(response, 200, null, results);
  });
});

// Delete specific User
app.delete('/api/v1/users/:id',(request, response) => {
  let sql = "DELETE FROM userdata WHERE id="+request.params.id+"";
  let query = pool.query(sql, (error, results) => {
    if(error) throw error;
    sendResponse(response, 200, null, results);
  });
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});

function sendResponse(response, status, error, result) {
  response.status(status).send(JSON.stringify({"status": status, "error": error, "result": result}));
}
