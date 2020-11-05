'use strict'

const { Timestamp } = require('mongodb');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
mongoose.set('useCreateIndex', true);

var CustomerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String
}, {
    timestamps: {currentTime: () => Math.floor(Date.now() / 1000)}
});

CustomerSchema.index({
    firstName: 'text',
    lastName: 'text',
    email: 'text',
    phoneNumber: 'text'
})

CustomerSchema.plugin(mongoosePaginate);

var CustomerModel = mongoose.model('Customers', CustomerSchema, "Customers");
CustomerModel.createIndexes();

module.exports = CustomerModel;



