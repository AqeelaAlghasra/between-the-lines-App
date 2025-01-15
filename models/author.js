const { request } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Book = require('../models/book.js');

const authorSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId, ref: 'User'
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
    required: true,
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
    required:false, // update to true later 
    unique: false,
  },
  updatedAt: {
    type: Date,
    required: false,//updated to true later 
    unique: false,
  },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('Author', authorSchema);
