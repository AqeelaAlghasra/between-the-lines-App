const { request } = require('express');
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    Books:[{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
    
});

const orderSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        },
    total_amount: {
        type: Number,
        required: true,
        unique:false,
    },
    
    orderDate: {
        type: Date,
        default: Date.now,
        required: true,
        unique:false,
    },
    status:{
        type: String,
        enum: ['pending','delivered', `cancelled`, 'confirmed', 'Reference', 'Religious/Spiritual',`Science and Nature`,'History','Business and Economics'],
        required: true
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
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],

});

