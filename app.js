const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Require routes
require('./routes/users')(app);
require('./routes/session')(app);
require('./routes/swagger')(app);
require('./routes/index')(app);

// Parser for JSON
app.use(bodyParser.json());

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
