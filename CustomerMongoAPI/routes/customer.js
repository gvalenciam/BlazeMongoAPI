'use strict'

var express = require('express');

var CustomerController = require('../controllers/CustomerController');

var api = express.Router();

api.get('/customers/', CustomerController.getAllCustomers);
api.get('/customer/:id', CustomerController.getCustomer);
api.get('/customers/:searchTerm', CustomerController.getCustomerByWord);
api.put('/customers/:id', CustomerController.updateCustomerById);
api.post('/customers/', CustomerController.addCustomer);

module.exports = api;