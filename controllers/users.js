const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn.js')
const isAdmin = require('../middleware/isAdmin');
const { User, Author, Customer, Order, Book } = require('../models/user.js');




// admin route 

//admin dashboard
router.get('/dashboard', isSignedIn, isAdmin, async (req, res) => {
  try {
    const books = await Book.countDocuments();
    const users = await User.countDocuments();
    const customers = await Customer.countDocuments();
    const authors = await Author.countDocuments();
    const orders = await Order.countDocuments();
    const soldBooks = await Book.aggregate([
      {
        $group: {
          _id: null,
          totalSold: { $sum: "$soldNo" },
        }
      }
    ]);

    // const pendingOrder = await Book.aggregate([
    //   {
    //     $group: {
    //       _id:null,
    //       pending: { $sum : }
    //     }
    //   }
    // ]);

    const totalSoldBooks = soldBooks.length > 0 ? soldBooks[0].totalSold : 0;
    const bookOfTheMonth = await Book.findOne().sort({ soldNo: -1 }).select('title');
    //const pendingOrderCount = pendingOrder.length >0 ? pendingOrders[0]
    console.log(books);
    const data = {
      bookCount: books,
      userCount: users,
      customerCount: customers,
      authorsCount: authors,
      ordersCount: orders,
      //pendingOrderCount: '',
      soldBooksCount: totalSoldBooks,
      bookOfTheMonth: bookOfTheMonth.title || 'NA',
    };

    res.render('admin/dashboard.ejs', { data });
  } catch (err) {
    res.status(500).send(err)

  }
});
//admin profile
router.get('/profile', isSignedIn, isAdmin, async (req, res) => {
  const user = await User.findById(req.session.user._id)
  res.render('admin/users/profile.ejs', {
    user: user

  })
})
// fetch all users
router.get('/users/', isSignedIn, isAdmin, async (req, res) => {
  const allUsers = await User.find({})
  res.render('admin/users/index.ejs', {
    users: allUsers
  })
})

// fetch all orders

router.get('/orders/', isSignedIn, isAdmin, async (req, res) => {

  const orders = await Order.find({});

  res.render('orders/index.ejs', {
    orders: orders

  })
});

// fetch all books 
router.get('/books/', isSignedIn, isAdmin, async (req, res) => {

  const books = await Book.find({}).populate('authors');
  console.log(books)
  res.render('books/index.ejs', {
    books: books


  })
})

// CRUD books by Admin

router.get('/books/new', isSignedIn, isAdmin, async (req, res) => {

  try{
        const authors = await Author.find({}, 'firstName lastName user').populate('user');
        
        res.render('books/newforAdmin.ejs',{authors: authors})
    
      }catch(err){
        res.status(500).send(error)
      }
})


router.post('/books',isSignedIn, isAdmin, async( req, res)=>{
  console.log(req)
  const {authorId,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category} = req.body;
    try {
      const newBook = new Book({
        authors: authorId ,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category
      }) 
      await newBook.save();
      
      const author = Author.findById(authorId).populate('books');
      
      author[0].books.push(newBook);
      await author[0].save();
      
      console.log(newBook)
      res.redirect(`/admin/books/`);
      
    } catch (error) {
      console.log(error);
      res.redirect('/admin/books/');
    }
});

router.get('/books/:bookId',async(req,res)=>{

  try {
    const book = await Book.findById(req.params.bookId).populate('authors') 
         
    console.log(Book)
    res.render("books/show.ejs", {book:book});
    
  } catch (error) {
    console.log(error);
    res.redirect('/admin/books/');
  }

});

router.get('/books/:bookId/edit',isSignedIn,isAdmin,async(req,res)=>{

  try {
    const book = await Book.findById(req.params.bookId).populate('authors.author'); 
    const authors = await Author.find({}, 'firstName lastName user').populate('user');
    res.render("books/edit.ejs", { book : book, authors:authors});
    console.log(authors)
    
  } catch (error) {
    console.log(error);
    res.redirect('/admin/books/');
  }

});


  router.put('/books/:bookId',isSignedIn, isAdmin, async (req, res) => {
    try {
      const {authorId,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category} = req.body;

      const author = await Author.find({user:authorId}).populate('books');
      const updateBookdata =
      {  authors: authorId ,title, description,price,stockQuantity,thumbnail,publishedDate,pages,category
      }   
      // console.log(updateBookdata)
      const updateBook = await Book.findByIdAndUpdate(req.params.bookId,updateBookdata);
      
      
      author.books.push(updateBook);
      await author.save();
      console.log(author,updateBook)
      res.redirect(
        `/admin/books/${updateBook._id}`
      );
    } catch (error) {
      console.log(error);
      res.redirect('/admin/books/');
    }
  });



  router.delete('/books/:bookId',isSignedIn, isAdmin, async (req, res) => {
    try {
      
      const currentBook = await Book.findByIdAndDelete(req.params.bookId);
      
      res.redirect(`/admin/books/`);
    } catch (error) {
      // If any errors, log them and redirect back home
      console.log(error);
      res.redirect('/admin/books/');
    }
  });  

// users routers



router.get('/users', async (req, res) => {
  const allUsers = await User.find({})
  res.render('users/index.ejs', {
    users: allUsers
  })
})

router.get('/users/new', async (req, res) => {
  res.render('admin/users/new.ejs')
})

router.get('users/:userId/dashboard', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.render('admin/dashboard.ejs', {
    user: user

  })
})

router.post('/users/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.redirect(`/admin/users/`);

  } catch (error) {
    console.log(error);
    res.redirect('/admin/users/');
  }
});


router.put('/users/:userId', async (req, res) => {
  try {
    console.log(req.body)
    const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body);
    console.log(updateUser)
    res.redirect(
      `/admin/users/${updateUser._id}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/admin/users');
  }
});

router.get('/users/:userId', async (req, res) => {
  try {

    const currentUser = await User.findById(req.params.userId);
    res.render(
      `admin/users/show.ejs`, { user: currentUser }
    );
  } catch (error) {
    console.log(error);
    res.redirect('/admin/users');
  }
});

router.get('/users/:userId/edit', async (req, res) => {
  try {

    const currentUser = await User.findById(req.params.userId);
    res.render(
      "admin/users/edit.ejs", { user: currentUser }
    );
  } catch (error) {
    console.log(error);
    res.redirect('/admin/users');
  }
});



router.delete('/users/:userId', async (req, res) => {
  try {

    const currentUser = await User.findByIdAndDelete(req.params.userId);

    res.redirect(`/admin/users`);
  } catch (error) {
    // If any errors, log them and redirect back home
    console.log(error);
    res.redirect('/admin/users');
  }
});





// orders Routes


router.get('/orders', async (req, res) => {
  const allOrders = await Order.find({})
  res.render('orders/index.ejs', {
    orders: allOrders
  })
})



//Books Routes
router.get('/books', async (req, res) => {
  const allBooks = await Book.find({})
  res.render('books/index.ejs', {
    books: allBooks
  })
})


router.get('/books/new', async (req, res) => {
  res.render('books/new.ejs')
})




// authors Routes
router.get('/authors/new', async (req, res) => {
  res.render('authors/new.ejs')
})




module.exports = router;
