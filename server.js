const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
const path = require("path");
require('dotenv').config();
require('./config/database');

// Controllers
const authController = require('./controllers/auth');
const userController = require('./controllers/users');
const customerController = require('./controllers/customers');
const authorController = require('./controllers/authors');
const bookController = require('./controllers/books');
// const bookController = require('./controllers/books');
const isSignedIn = require('./middleware/isSignedIn');
const isAdmin = require('./middleware/isAdmin');
const isAuthor = require('./middleware/isAuthor');
const isCustomer = require('./middleware/isCustomer');
const { Book } = require('./models/user');

const app = express();
// Set the port from environment variable or default to 3000
app.use(express.static('public'));
const port = process.env.PORT ? process.env.PORT : '3000';




// MIDDLEWARE

// app.use(express.static(path.join(__dirname, "public")));


// Middleware to parse URL-encoded data from forms

app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
app.use(express.static("public"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);

// Public Routes
app.get('/', async (req, res) => {
  res.render('index.ejs');
});


app.get('/listbooks',async (req,res)=> {

  const allbooks = await Book.find({}).populate('authors');
  console.log(allbooks)
  res.render('books/Allbooks.ejs',{books: allbooks});

});


app.get('/' ,(req, res) => {
  if(req.session.user){
    console.log(req.session.user)
    if (req.session.username==="Admin")
      res.redirect(`/admin/dashboard`)
    else if (req.session.user.role==="author")
      res.redirect(`/authors/${req.session.user._id}/dashboard`)
    else (req.session.user.role==="customer")
      res.redirect(`/customers/${req.session.user._id}/dashboard`)

  }
  else{
    res.render('index.ejs');
  }
  
});



app.use('/auth', authController);


// Protected Routes
app.use(isSignedIn);

app.use('/customers/',isSignedIn, customerController);

app.use(isAuthor);
app.use('/authors/',isSignedIn,isAuthor, authorController);


app.use(isAdmin);
app.use('/admin', isSignedIn, isAdmin ,userController);
app.use('/books/', isSignedIn ,isAuthor || isAdmin ,bookController);


// app.use('/users', usersController);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});
