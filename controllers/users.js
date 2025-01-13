const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', async(req,res)=>{
    
    const admin = await User.findById(req.session.user._id)
    
    res.render('admin/dashboard.ejs', { user: admin
        
    })
})


router.get('/:userId/dashboard', async(req,res)=>{ 
    const admin = await User.findById(req.params.userId)
    res.render('admin/dashboard.ejs', { user: admin
        
    })
})

router.get('/users', async(req,res)=>{
    const allUsers = await User.find({})
    res.render('admin/users/index.ejs', {
        users: allUsers
    })
})

router.get('/users/new', async(req,res)=>{
    res.render('admin/users/new.ejs')
})


router.post('/users/',async( req, res)=>{
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
      const updateUser = await User.findByIdAndUpdate(req.params.userId,req.body);
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
        `admin/users/show.ejs`,{user: currentUser}
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
        "admin/users/edit.ejs",{user: currentUser}
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


module.exports = router;
