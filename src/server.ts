// # Import: Imports express package 
const express = require('express');
// # Set: Set port for use by application
const PORT = process.env.PORT || 3001;

import path from 'path';

// Import: Moduler routes
const apiRoutes = require('.' + path.sep + 'routes' + path.sep + 'apiRoutes');
const htmlRoutes = require('.' + path.sep + 'routes' + path.sep + 'htmlRoutes');

// initialize: app variable by setting it to 'express'
const app = express();

// # Middlewear: Express middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


// # Serve: files from the public directory
app.use(express.static('public'));

// # Utilize: Utilize routes contained in the routes directory
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// # Listen: listens on defined PORT for connections
app.listen(PORT, () =>
    console.log(`Listening on https://localhost:${PORT}`)
);
