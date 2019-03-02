const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { authMiddleware } = require('../helpers/auth');


// ---------------- Find auth route ---------------- 

router.post('/auth',function(req,res){
    const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
  }

  User.findOne({email}, function(err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
    }

    if (user.hasSamePassword(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, { expiresIn: '1h'});
      return res.json(token);
      
    } else {
      return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
    }
  });


});

// ---------------- Find sregister route---------------- 

router.post('/register',function(req,res){
  const {username ,email ,password ,passwordConfirmation} = req.body;
 
 //check if data send
  if(!email || !password){
   return res.status(422).send({errors:[{title:'Data missing', detail:'Provide email and password'}]});
     
  }
//check if password === pssword confirmation
  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'Password is not a same as confirmation!'}]});
  }


// check if user is found
   User.findOne({email}, function(err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exist!'}]});
    }

    const user = new User({
      username,
      email,
      password
    });

    user.save(function(err){
      if (err){
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json({"registered":true});
    });

  });


});



// ----------------  Find user profile by id ---------------- 

router.get('/:id',authMiddleware,function(req,res){
const requestedUserId = req.params.id;
const user = res.locals.user;

if(requestedUserId === user.id){
  User.findById(requestedUserId,function(err,foundUser){
    if(err){
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    res.json(foundUser);
  })
}else{
    User.findById(requestedUserId).select("-revenue -stripeCustomerId -password").exec(function(err,foundUser){
    if(err){
   return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
    res.json(foundUser);
  })
}


});











module.exports = router;



