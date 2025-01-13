const express = require('express');
const router = express.Router();

const User = require('../models/user.js');



router.get('/', async(req,res)=>{
    
    const authors = await User.find({role: 'Author'})
    
    res.render('authors/index.ejs', { authors: authors
        
    })
})


router.get('/new', async(req,res)=>{
    res.render('authors/new.ejs');
})

router.post('/authors/',async( req, res)=>{
    try {

        const createdAt = Date.now();
        
        req.body.createdAt=createdAt

      const newAuthor = await Author.create(req.body);
      
      res.redirect(`/authors/`);
      
    } catch (error) {
      console.log(error);
      res.redirect('/authors/');
    }
  });


router.get(':authorId', async(req,res)=>{
    // to be changed by author Id
    const author = await User.findById(req.params.authorId)
    
    res.render('authors/show.ejs', { author: author
        
    })
})

module.exports = router; 