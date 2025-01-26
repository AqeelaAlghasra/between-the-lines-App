const express = require('express');
const router = express.Router();
const isSignedIn = require('../middleware/isSignedIn.js')

const {User, Customer} = require('../models/user.js');
const {Order} =require('../models/user.js');
const isCustomer = require('../middleware/isCustomer.js');


// router.get('/', async(req,res)=>{
    
//     const customers = await User.find({role:'Customer'})
    
//     res.render('customers/index.ejs', { users: customers
        
//     })
// })



router.get('/',isSignedIn, async(req,res)=>{
    
    if(req.session.user.role==='Admin'){
      const customers = await User.find({role: 'customer'})
      res.render('customers/index.ejs', { customers: customers
        
    })  
  }else{
    const customer = await User.find({role: 'customer',_id: req.session.user._id})
    const data = {
      bookCount: 150,  
      soldBooksCount: 75,
      stockQuantity:50, 
      mostSoldBook: 'The Great Gatsby' 
    };

    res.render('customers/dashboard.ejs',{ data:data});
    }
})


// router.get('/dashboard',isSignedIn,isCustomer,async(req,res)=>{
//     const customer = await User.find({role: 'customer',_id: req.session.user._id})
//     const data = {
//       bookCount: 150,  
//       soldBooksCount: 75,
//       stockQuantity:50, 
//       mostSoldBook: 'The Great Gatsby' 
//     };

//     res.render('customers/dashboard.ejs',{ data:data});
// });

router.get('/:userId/profile',isSignedIn,isCustomer, async(req,res)=>{ 
    const user = await Customer.find({user:req.params.userId}).populate('user')
    console.log(user)
    res.render(`/customers/profile.ejs`, { customer: user
        
    })
  })

router.get('/new', async(req,res)=>{
    res.render('customers/new.ejs');
})

router.post('/new', async(req,res)=>{
    res.render('/customers/new.ejs');
})


router.get('/:userId', async(req,res)=>{
    
    const customer = await User.findById(req.params.userId)
    
    res.render('customers/show.ejs', { user: customer
        
    })
})

router.post('/customers/wishlist',isSignedIn,isCustomer, async(req,res)=>{
  console.log(req.body);
  const { bookId } = req.body;
try{
  const customer = await Customer.find({user: req.session.user._id}).populate('user')
  
  const currentWishlist = customer.wishlist.find(item => item.book.equals(bookId) );

  if (currentWishlist){
    return res.status(400).send('Book is already in the wishlist')
  }

  customer.wishlist.push({book: bookId})
  await customer.save();
  res.status(201).json(customer.wishlist)
}catch(err){
  console.error('Error adding to wishlist:', err);
  res.status(500).send('Internal server error');

}

  
});


module.exports = router; 