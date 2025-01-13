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
const adminController = require('./controllers/users');
const customerController = require('./controllers/customers');
const authorController = require('./controllers/authors');
const isSignedIn = require('./middleware/isSignedIn');

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

app.get('/', (req, res) => {
  if(req.session.user){
    console.log(req.session.user)
    if (req.session.user.role==="Admin")
      {console.log('admin')
      res.redirect(`/admin/${req.session.user._id}/dashboard`)}
    else if (req.session.user.role==="Author")
      res.redirect(`/author/`)
    else (req.session.user.role==="Customer")
      res.redirect(`/customer/`)

  }
  else{
    res.render('index.ejs');
  }
  
});



app.use('/auth', authController);

// Protected Routes
app.use(isSignedIn);
app.use('/admin', adminController);
app.use('/customers', customerController);
app.use('/authors', authorController);
// app.use('/users', usersController);
app.get('/protected', async (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.sendStatus(404);
    res.send('Sorry, no guests allowed.');
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});
