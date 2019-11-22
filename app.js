const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Parser for JSON
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// Require routes
require('./routes/users')(app);
require('./routes/swagger')(app);
require('./routes/index')(app);

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});
