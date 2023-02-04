// import express package
const express = require('express');

// import route modules 
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// initialize our app variable by setting it to the value of express()
const app = express();
// setting computer port number for service and Heruko deployment
const PORT = process.env.PORT || 4001;

// body parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// installing middleware
app.use(express.static('public'));

// routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// keep your web service awake and listening
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
});