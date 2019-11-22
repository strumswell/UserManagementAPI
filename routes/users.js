const pool = require('../util/db');
const bcrypt = require('bcrypt');

// Send standardized response
function sendResponse(response, status, error, result) {
  response.status(status).send(JSON.stringify({"status": status, "error": error, "result": result}));
}

// ==================
//  Users routes
// ==================
module.exports = (app) => {
  // Return all Users
  app.get('/v1/users',(request, response) => {
    let sql = "SELECT * FROM userdata";
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
    // Change plain text to hash
    data.password = bcrypt.hashSync(data.password, 10);
    // Build query and execute
    let sql = "INSERT INTO userdata SET ?";
    let query = pool.query(sql, data,(error, results) => {
      // Missing or wrong attributes used
      if(error) return sendResponse(response, 400, error.sqlMessage, null);
      // All good
      sendResponse(response, 200, null, results);
    });
  });

  // Login user ; NOTE: security is out of scope for this PoC and therefore returns the userid
  app.post('/v1/users/login',(request, response) => {
    let data = request.body;
    let sql = "SELECT id,password from userdata where email='"+request.body.email+"'";
    let query = pool.query(sql, (error, results) => {
      // Missing or wrong attributes used
      if(error) console.log(error);
      // Check for password validity
      if(bcrypt.compareSync(request.body.password, results[0].password)) {
        sendResponse(response, 200, null, {"userid": results[0].id});
      } else {
        sendResponse(response, 200, "Authentication failed!", null);
      }
    });
  });

  // Update specific User
  app.put('/v1/users/:id',(request, response) => {
    let data = request.body;
    let password = data.password;
    // Wanna change password?
    if (password !== undefined) {
      // Hash password and change request body
      let hashed_password = bcrypt.hashSync(password, 10);
      data.password = hashed_password;
    }
    // Update DB
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
}
