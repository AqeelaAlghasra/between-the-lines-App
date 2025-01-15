const mongoose = require('mongoose')


const User = require('./user');

const orderSchema = new mongoose.Schema({
  orderId: { 
    type:String,
    unique: true,
  }

})
const wishlistSchema = new mongoose.Schema({
  bookId: { 
    type:String,
    unique: true,
  }

})



const customerSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
      firstName:{
        type: String,
        required: true,
        unique:false,
        },
      lastName:{
        type: String,
        required: true,
        unique:false,
        },
      email:{
        type: String,
        required: true,
        unique:false,
        },
      address:{
        type: String,
        required: true,
        unique:false,
        },
      phone:{
        type: String,
        required: true,
        unique:false,
        },
        createdAt:{
          type: Date,
          required: true,
          
          unique:false,
          },
        updatedAt:{
        type: Date,
        required: true,
        unique:false,
        },  
      orders: [orderSchema],
      wishlist: [wishlistSchema],
      
});


const Customer = mongoose.model('Customer', customerSchema);



module.exports = Customer;
