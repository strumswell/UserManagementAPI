// Send standardized response
function sendResponse(response, status, error, result) {
  response.status(status).send(JSON.stringify({"status": status, "error": error, "result": result}));
}

module.exports = (app) => {
  // Serving unknown routes
  app.use('/', (request, response) => {
    response.send("Woah, what are you trying to do? You can find the documentation @ "+process.env.API_BASE_URL+"docs if you have no clue what you are doing.");
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
