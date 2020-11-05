'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://GerardoVM:redbull0894@cluster0.wa0io.mongodb.net/CustomersDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(()=>{
  console.log("Conectado a la base de datos");

  app.listen(port, ()=> {
    console.log("Servidor corriendo en http://localhost:3800");
  })
}).catch(err => console.log(err))

