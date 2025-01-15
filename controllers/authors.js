const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Author = require('../models/author.js');
const Book = require('../models/book.js');



router.get('/', async(req,res)=>{
    
    const authors = await User.find({role: 'Author'})
    
    res.render('authors/index.ejs', { authors: authors
        
    })
})


router.get('/new', async(req,res)=>{
    res.render('authors/new.ejs');
})
router.get('/:authorId/books/new', async(req,res)=>{
    const author = await Author.findById(req.params.authorId);
    console.log(author);
    res.render('books/new.ejs',{author: author});
})

router.get('/:authorId/books/:bookId/edit', async(req,res)=>{
  const author = await Author.findById(req.params.authorId);
  const book = await Book.findById(req.params.bookId)
  res.render('books/edit.ejs',{author: author, book: book});
})


router.get('/:authorId/books/:bookId', async(req,res)=>{
  const author = await Author.findById(req.params.authorId);
  const book = await Book.findById(req.params.bookId)
  res.render('books/show.ejs',{author: author, book: book});
})


router.post('/',async( req, res)=>{
    try {
      const {authorId,username,firstName,bio,nationality} = req.body;
      const newAuthor = new Author({authorId,username,firstName,bio,nationality});
      console.log(newAuthor)
      res.redirect(`/authors/${newAuthor._id}`);
      
    } catch (error) {
      console.log(error);
      res.redirect('/authors/');
    }
  });




  router.put('/:authorId', async (req, res) => {
    try {
      // console.log(req.body)
      const updatedAt = Date.now.toDateString;
      console.log(updatedAt)

      req.body.updatedAt = updatedAt.toString;

      const updateAuthor = await Author.findByIdAndUpdate(req.params.authorId,req.body);
      console.log(updateAuthor)
      res.redirect(
        `/${updateAuthor._id}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/authors/');
    }
  });

  router.get('/:authorId', async(req,res)=>{
    // to be changed by author Id
    //console.log(req.params)
    const author = await Author.findById(req.params.authorId)
    
    res.render('authors/show.ejs', { author: author
        
    })
})

router.get('/:authorId/books', async(req,res)=>{
  // to be changed by author Id
  //console.log(req.params)
  const author = await Author.findById(req.params.authorId)
  
  
  res.render('books/index.ejs', { author: author,books: []
      
  })
})


  router.get('/:authorId/edit', async(req,res)=>{
    // to be changed by author Id
    //console.log(req.params)
    
    const author = await Author.findById(req.params.authorId).populate('user')
    console.log(author);
    res.render('authors/edit.ejs', { author: author,
      user: req.session.user
        
    })
})


router.get('/:authorId', async(req,res)=>{
    // to be changed by author Id
    //console.log(req.params)
    const author = await Author.findById(req.params.authorId).populate('User')
    
    res.render('authors/show.ejs', { author: author
        
    })
})

module.exports = router; 