const { request } = require('express');
const mongoose = require('mongoose');


const User = require('./user');
const Book = require('./book');


const reviewSchema= new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    reviewContent: {
        type: String,
        required: true,
    },
    rating:{
        type: Number,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    
    
});


const Review = mongoose.model('Review',reviewSchema )

module.exports = Review;