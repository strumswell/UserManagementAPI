const pool = require('../util/db');

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
}
