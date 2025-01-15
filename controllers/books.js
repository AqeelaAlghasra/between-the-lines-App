const { request } = require('express');
const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');
const Author = require('../models/author.js');
const User = require('../models/user.js');


exports.getAuthors = async (req,res) => {
  try{
    const authors = await Author.find().populate('authors');
    res.render('authors',{authors})

  }catch(err){
    res.status(500).send(error)
  }
};


router.get('/', async(req,res)=>{
    const books = await Book.find({});
    res.render('books/index.ejs', { books: books
        
    })
})


router.get('/books/', async(req,res)=>{
    const allBooks = await Book.find({})
    res.render('books/index.ejs', {
        books: allBooks
    })
})

router.get('/new', async(req,res)=>{
    res.render('./books/new.ejs');
})


router.post('/',async( req, res)=>{
  const {authorId,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category} = req.body;
    try {
      const newBook = new Book({
        authorId,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category
      }) 
      await newBook.save();     
      console.log(newBook)
      res.redirect(`/books/`);
      
    } catch (error) {
      console.log(error);
      res.redirect('/books/');
    }
  });


  router.put('/books/:bookId', async (req, res) => {
    try {
      console.log(req.body)
      const updateBook = await Book.findByIdAndUpdate(req.params.bookId,req.body);
      console.log(updateBook)
      res.redirect(
        `/books/${updateBook._id}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/books/');
    }
  });

  router.get('/books/:bookId', async (req, res) => {
    try {
      const currentBook = await Book.findById(req.params.bookId);

      res.render(
        `/books/show.ejs`,{book: currentBook}
      );
    } catch (error) {
      console.log(error);
      res.redirect('/books/');
    }
  });

  router.get('/:bookId/edit', async (req, res) => {
    try {
      const currentBook = await Book.findById(req.params.bookId).populate('author');
      console.log(currentBook);
      // res.render(
      //   'books/edit.ejs'
      // );
    } catch (error) {
      console.log(error);
      res.redirect('/books/');
    }
  });

  // router.get('/users/:userId/edit', async (req, res) => {
  //   try {
      
  //     const currentUser = await User.findById(req.params.userId);
  //     res.render(
  //       "admin/users/edit.ejs",{user: currentUser}
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     res.redirect('/admin/users');
  //   }
  // });
  


  router.delete('/books/:bookId', async (req, res) => {
    try {
      
      const currentBook = await Book.findByIdAndDelete(req.params.bookId);
      
      res.redirect(`/books/`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/books/');
    }
  });


module.exports = router;
