const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/customers', async(req,res)=>{
    
    const customers = await User.find({role:'Customer'})
    
    res.render('customers/index.ejs', { users: customers
        
    })
})

router.get('/new', async(req,res)=>{
    res.render('customers/new.ejs');
})

router.get('/:userId', async(req,res)=>{
    
    const customer = await User.findById(req.params.userId)
    
    res.render('customers/show.ejs', { user: customer
        
    })
})


module.exports = router; 