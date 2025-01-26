const { request } = require('express');
const mongoose = require('mongoose');
const Author = require('../models/author.js');
const Review = require('../models/review.js');

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true,
      },
    description: {
        type: String,
        required: true,
        unique:false,
    },
    price: {
        type: Number,
        required: true,
        unique:false,
    },
    stockQuantity: {
        type: Number,
        required: true,
        unique:false,
    },
    publishedDate: {
        type: Date,
        required: true,
        unique:false,
    },
    thumbnail: {
        type: String,
        required: true,
        unique:false,
    },
    pages: {
        type: Number,
        required: true,
        unique:false,
    },
    category:{
        type: String,
        enum: ['Fiction', 'Non-Fiction', `Children'sBooks`, 'Comics', 'Reference', 'Religious/Spiritual',`Science and Nature`,'History','Business and Economics'],
        required: true
    },
    createdAt:{
        type: Date,
        required: false,
        default:Date.now
    }, 
    updatedAt:{
        type: Date,
        default: Date.now,
        required: true,
        unique:false,
    }, 
  author: {type: mongoose.Schema.Types.ObjectId,ref: 'Author',},
  reviews:[{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],

});


