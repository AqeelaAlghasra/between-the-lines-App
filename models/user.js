const { request } = require('express');
const mongoose = require('mongoose');
// const author = require('.author/author');
// const author = require('./author');
// const book = require('./book');
// const author = require('./author');

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    unique: false,
  },
  text: {
    type: String,
    required: true,
    unique: false,
  },
});

const wishlistSchema = new mongoose.Schema({
  books: [ {type: mongoose.Schema.Types.ObjectId,ref: 'Book',}]
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  total_amount: {
    type: Number,
    required: true,
    unique: false,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
    unique: false,
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', `cancelled`, 'confirmed', 'Reference', 'Religious/Spiritual', `Science and Nature`, 'History', 'Business and Economics'],
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    unique: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    unique: false,
  },
  orderItems: [{
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" }
    ,quantity: {
      type: Number,
      default: 1,
    },
  },

  ],

});


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  },
  stockQuantity: {
    type: Number,
    default:0,
    unique: false,
  },
  soldNo:{type: Number,
    default:0,
    unique: false,
  },
  publishedDate: {
    type: Date,
    required: true,
    unique: false,
  },
  thumbnail: {
    type: String,
    required: true,
    unique: false,
  },
  pages: {
    type: Number,
    required: true,
    unique: false,
  },
  category: {
    type: String,
    enum: ['Fiction', 'Non-Fiction', `Children'sBooks`, 'Comics', 'Reference', 'Religious/Spiritual', `Science and Nature`, 'History', 'Business and Economics'],
    required: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
    unique: false,
  },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author', } ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

});

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
    required: false,
    unique: false,

  }
});

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  address: {
    type: String,
    required: false,
    unique: false,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default:Date.now,
    required: true,

    unique: false,
  },
  updatedAt: {
    type: Date,
    default:Date.now,
    unique: false,
  },
  orders: [orderSchema],
  wishlist: [wishlistSchema],

});



const authorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
  },
  bio: {
    type: String,
    required: false,
    unique: false,
  },
  Nationality: {
    type: String,
    required: false,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false, // update to true later 
    unique: false,
  },
  updatedAt: {
    type: Date,
    required: false,//updated to true later 
    unique: false,
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Book'
  }],
});



const User = mongoose.model('User', userSchema);
const Author = mongoose.model('Author', authorSchema);
const Customer = mongoose.model('Customer', customerSchema);
const Book = mongoose.model('Book', bookSchema);
const Order = mongoose.model('order', orderSchema);

module.exports = { User, Author, Book, Order, Customer };

