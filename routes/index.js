// Send standardized response
function sendResponse(response, status, error, result) {
  response.status(status).send(JSON.stringify({"status": status, "error": error, "result": result}));
}

module.exports = (app) => {
  app.use('/', (request, response) => {
    response.send("Welcome! You can find the documentation @ /docs");
  });
  // Catch wrong JSON in requests
  app.use(function (error, request, response, next) {
    if (error instanceof SyntaxError) {
      sendResponse(response, 400, "Invalid JSON.", null);
    } else {
      next();
    }
  });
}
