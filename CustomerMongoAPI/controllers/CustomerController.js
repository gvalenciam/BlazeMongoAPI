'use strict'

var mongoose = require('mongoose');
var Customer = require('../models/Customer');

exports.getCustomer = function(req, res) {

    var customerId = req.params.id;

    Customer.findById(customerId, (err, customer) => {
        if (err) return res.status(500).send({
            message: "Error en la petición"
        })

        if (!customer) return res.status(404).send({
            message: 'El cliente no existe'
        });

        return res.status(200).send({
            customer: customer
        });
    })
}

exports.getAllCustomers = function(req, res) {
    
    console.log(req.query);

    var offset = 4;
    var limit = 4;

    if (req.query) {
        offset = parseInt(req.query.offset, 10);
        limit = parseInt(req.query.limit, 10);
    }

    Customer.paginate({}, {offset: offset, limit: limit}, (err, responseObject) => {
        if (err) return res.status(500).send({
            message: err
        })

        if (!responseObject.docs) return res.status(404).send({
            message: 'No hay clientes'
        });

        return res.status(200).send({
            response : {
                customers: responseObject.docs,
                total: responseObject.total,
                limit: responseObject.limit,
                offset: responseObject.offset,
                pages: responseObject.pages
            }
        });
    })
}

exports.getCustomerByWord = function(req, res) {

    var searchString = req.params.searchTerm;

    Customer.find({$text: {$search: searchString}}, (err, customers) => {
        if (err) return res.status(500).send({
            message: "Error en la petición"
        })

        if (!customers) return res.status(404).send({
            message: 'No hay clientes'
        });

        return res.status(200).send({
            customers: customers
        });
    })
}

exports.addCustomer = function(req, res) {

    var payload = req.body;

    var newCustomer = new Customer({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber
    })

    newCustomer.save((error, createdCustomer) => {
        if (error) return res.status(500).send({
            message: "Error en la petición"
        })

        return res.status(200).send({
            createdCustomer: createdCustomer
        })

    })

}

exports.updateCustomerById = function(req, res) {

    var customerId = req.params.id;

    Customer.findByIdAndUpdate(customerId, req.body, (error, updatedCustomer) => {
        if (error) return res.status(500).send({
            message: "Error en la petición"
        })

        if (!updatedCustomer) return res.status(404).send({
            message: 'No existe el cliente'
        })

        return res.status(200).send({
            updatedCustomer: updatedCustomer
        })
    })
}