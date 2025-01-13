const mongoose = require('mongoose')


//1. first create the Schema ( javascript object for the mongosDB)



//2. register the schema with mongoDB as a model name , schema

const Customer = mongoose.model('Customer', customerSchema);

//3. share the model with the rest of the application 

module.exports = Customer;
