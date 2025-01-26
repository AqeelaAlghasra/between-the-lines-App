const express = require('express');

const { User, Author, Customer } = require('../models/user.js');

const auth = require('../config/auth');

const router = express.Router();
const isAdmin = require('../middleware/isAdmin.js')

// Sign up
router.get('/sign-up', async (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  // grab the values from the req body
  console.log(req.body)
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const role = req.body.role;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });

  // if the user exists,then dont bother doing anything, just send a message to the browser
  if (existingUser) {
    return res.send('Username is taken');
  }
  // verify that the password matches
  if (password !== confirmPassword) {
    return res.send("Passwords don't match!");
  }

  // create the user in the database
  // -b make the password secure
  const hashPassword = auth.encryptPassword(password);
  const payload = { username, password: hashPassword, role: role };


  const newUser = await User.create(payload);
  req.session.user = {
    username: newUser.username,
    role: newUser.role,
    _id: newUser._id,
  };
  console.log(req.session.user)
  if (role === 'customer') {

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
      user: req.session.user._id,
    };

    const newCustomer = await Customer.create(data);

    console.log('Customer', newCustomer)

  }else{
    const data = {
      user: req.session.user._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      nationality: req.body.nationality,
    };
    const newAuthor = await Author.create(data)
    console.log('Author', newAuthor)
  }


  // sign person in and redirect to home page
  req.session.user = {
    username: newUser.username,
    role: newUser.role,
    _id: newUser._id,
  };

  req.session.save(() => {
    if (role === 'author'){
      res.redirect(`/authors/`, { user: newUser });
      return;
    }
    if (role === 'customer'){
      res.redirect(`/customers/`, { user: newUser });
      return;
    }
    res.redirect('/');
  });
});

// Sign in
router.get('/sign-in', async (req, res) => {
  res.render('auth/sign-in.ejs');
});

router.post('/sign-in', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // find a user from the username they filled out
  const user = await User.findOne({ username: username });
  // if the user doesnt exist, send an error msg
  if (!user) {
    return res.send('Login failed, please try again');
  }

  // compare the password they submitted with the password in the db
  const validPassword = auth.comparePassword(password, user.password);
  // if the password is no good, then send an error
  if (!validPassword) {
    return res.send('Login failed, please try again');
  }
  // else sign them in
  // create a session cookie
  req.session.user = {
    username: user.username,
    role: user.role,
    _id: user._id,
  };

  req.session.save(() => {
    if (req.session.user.role==="Admin"){
        res.redirect(`/admin/dashboard`)
        return;}
      else if (req.session.user.role==="author"){
        res.redirect(`/authors/`)
        return;
      }else if (req.session.user.role==="customer"){
        res.redirect(`/customers/`)
        return;
      }
  });
});

// Sign out
router.get('/sign-out', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
  res.redirect('/');
});

module.exports = router;