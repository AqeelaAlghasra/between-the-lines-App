const { request } = require('express');
const mongoose = require('mongoose');
// const author = require('./author');



// const authorSchema = new mongoose.Schema({
//   firstName : {
//     type: String,
//     required: true,
//     unique: false,
//   },
//   lastName : {
//     type: String,
//     required: true,
//     unique: false,
//   },
//   Nationality : {
//     type: String,
//     required: true,
//     unique: false,
//   },
//   createdAt:{
//     type: Date,
//     required:true,
//   },
  
// });

// const reviewSchema = new mongoose.Schema({
//   rating: {
//     type:Number,
//     required: true,
//     unique: false,
//   },
//   text: {
//   type : String,
//   required: true,
//   unique: false,
//   },
// });


// const bookSchema = new mongoose.Schema({
//   title : {
//       type: String,
//       required: true,
//       unique: true,
//     },
//   description: {
//       type: String,
//       required: true,
//       unique:false,
//   },
//   price: {
//       type: Number,
//       required: true,
//       unique:false,
//   }
//   ,
//   stockQuantity: {
//       type: Number,
//       required: true,
//       unique:false,
//   },
//   authors: [authorSchema],
//   reviews:[reviewSchema],

// });



// const wishlistSchema = new mongoose.Schema({
//   book_d: {
//     type:String,
//     required: true,  
//   }
// });

// const orderItems = new mongoose.Schema({});


// const orderSchema = new mongoose.Schema({
//   custID:{type:String,},
//   orderDate:{type:Date,},
//   totalAmount:{type:Number,},
//   status:{type:String,
//     m: ['confirmed','Pending', 'Accepted', 'Delivered', 'rejected'],
//   },
//   createdAt:{},
//   orderItems:{},
//   updatedAt: {},
// }) 



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  role: {
    type: String,
    required:false,
    unique:false,

  },
  // books: [bookSchema],
  // wishlist: [wishlistSchema],
  // orders:[orderSchema],
});

module.exports = mongoose.model('User', userSchema);
