const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../util/swagger.json');

// ==================
//  Swagger docs route
// ==================
module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
