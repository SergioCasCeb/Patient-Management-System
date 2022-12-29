const express = require('express');
const app = express();


const entriesPatientsRoutes = require('./api/routes/patient');
/*
const entriesServicesRoutes = require('./api/routes/service');
*/

app.use('/', express.static('./src'));
app.use('/', express.urlencoded({ extended: true }));
app.use('/patients', entriesPatientsRoutes);
// app.use('/services', entriesServicesRoutes);


module.exports = app;