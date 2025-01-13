const mongoose = require('mongoose');

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
        type: Decimal,
        required: true,
        unique:false,
    },
    stockQuantity: {
        type: Number,
        required: true,
        unique:false,
    },


});

const authorSchema = new mongoose.Schema({
    
  books: [bookSchema],
});

module.exports = mongoose.model('Author', authorSchema);
