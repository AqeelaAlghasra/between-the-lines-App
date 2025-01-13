import mongoose from "mongoose";


const reviewSchema= new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book_id: {
        type: Schema.Types.ObjectId,
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
    
});
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
  }
  ,
  stockQuantity: {
      type: Number,
      required: true,
      unique:false,
  },
  authors: [{type: Schema.Types.ObjectId, ref: "Author"}],
  reviews:[reviewSchema],

});





export const Book = mongoose.model('Book', )