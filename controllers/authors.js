const express = require('express');
const router = express.Router();
const { User, Author, Book } = require('../models/user.js');
// const {Author} = require('../models/author.js');
// const {Book} = require('../models/book.js');
const isAuthor = require('../middleware/isAuthor.js');
const isSignedIn = require('../middleware/isSignedIn.js');





router.get('/:userId/profile',isSignedIn,isAuthor, async(req,res)=>{ 
  const user = await Author.find({user:req.params.userId}).populate('user')
  console.log(user)
  res.render(`authors/profile.ejs`, { author: user[0]
  });
});


router.get('/', async(req,res)=>{
    
    if(req.session.user.role==='Admin'){
      const authors = await User.find({role: 'author'})
      res.render('authors/index.ejs', { authors: authors
        
    })  
  }else if( req.session.user.role === 'author'){
    const author = await Author.findOne({user:req.session.user._id}).populate('books');
    // let booksCount=0;
    // if(books in author[0]){
    //   booksCount=author[0].books.length
    // }else{
    //   booksCount=0
    // }
   
    const data = {
      bookCount: author.books.length || 0,  
      soldBooksCount: 75,
      stockQuantity:50, 
      mostSoldBook: 'The Great Gatsby' 
    };
    res.render('authors/dashboard.ejs',{ data:data, author:author});
    }
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
    const author = await Author.findById(req.params.userId)
    
    res.render('authors/show.ejs', { author: author
        
    })
})

router.get('/:authorId/books', async(req,res)=>{
  // to be changed by author Id
  //console.log(req.params)
  const {authorId} = req.params.authorId;
  const author = await Author.find({user: req.params.authorId }).populate('books')

  // const book = await Book.findById('678e70e3237afe8ce6366be6')
  // author[0].books.push(book);
  // await author[0].save();
  // let books= await author[0].populate('books.book');
  //const book = await Author.find({user: authorId}).populate('books');
  // const books = ;
  console.log(author[0])
  res.render('books/index.ejs', { books: author[0].books, author:author[0]
      
  })
})


  router.get('/:authorId/edit', async(req,res)=>{
    // to be changed by author Id
    //console.log(req.params)
    
    const author = await Author.findById(req.params.authorId).populate('authors')
    console.log(author);
    res.render('authors/edit.ejs', { author: author,
      user: req.session.user
        
    })
})


router.get('/:authorId', isSignedIn ,isAuthor,async(req,res)=>{
    // to be changed by author Id
    const author = await Author.findById(req.params.authorId).populate('User')
    //console.log(req.params)
    
    res.render('authors/show.ejs', { author: author
        
    })
})

module.exports = router; 