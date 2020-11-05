'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var customer_routes = require('./routes/customer');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', customer_routes);

module.exports = app;