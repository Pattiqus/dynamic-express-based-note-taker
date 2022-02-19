"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// # Import: Imports express package 
var express = require('express');
// # Set: Set port for use by application
var PORT = process.env.PORT || 3001;
var path_1 = __importDefault(require("path"));
// Import: Moduler routes
var apiRoutes = require('.' + path_1.default.sep + 'routes' + path_1.default.sep + 'apiRoutes');
var htmlRoutes = require('.' + path_1.default.sep + 'routes' + path_1.default.sep + 'htmlRoutes');
// console.log(apiRoutes);
// console.log(htmlRoutes);
// initialize: app variable by setting it to 'express'
var app = express();
// # Middlewear: Express middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// # Serve: files from the public directory
app.use(express.static('..' + path_1.default.sep + 'public'));
// # Utilize: Utilize routes contained in the routes directory
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// # Listen: listens on defined PORT for connections
app.listen(PORT, function () {
    return console.log("Listening on https://localhost:".concat(PORT));
});
