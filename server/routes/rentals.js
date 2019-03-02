const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const { authMiddleware } = require('../helpers/auth');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Booking = require('../models/booking');
const bodyParser = require('body-parser').json();




// ---------------- Test auth middleware ---------------- 
router.get('/secret', authMiddleware, function(req, res) {
  res.json({"secret":true});
});

// ---------------- Find all rentals ---------------- 

router.get('/allRentals',function(req,res){



//  const city = req.query.city;
//  const query = city ? {city:city.toLowerCase()} : {};
// Rental.find(query)

      Rental.find({})
      .select('-bookings')
      .populate('reviews')     
      .exec(function(err,foundRentals){

          if(err){
         return res.status(422).send({errors: normalizeErrors(err.errors)});
           } 

          if(foundRentals.length === 0){
            return  res.status(422).send({errors:[{title:'Rental Error', detail:'could not found Rental'}]});
          }

          return  res.json(foundRentals);

     });
 
});

// ---------------- Get logged in user rentals ---------------- 

router.get("/manage",authMiddleware,function(req,res){
    const user = res.locals.user;
    console.log("user34",user);
  Rental
    .where({user})
    .populate('bookings')
    .exec(function(err, foundRentals) {
    if(err){
       return res.status(422).send({errors: normalizeErrors(err.errors)});
    }else{
      res.json(foundRentals);
    }
  })
})


// ---------------- Find single rental---------------- 
router.get('/:id',function(req,res){
  Rental.findOne({ _id:req.params.id }).populate("bookings",'startDate endDate -_id').populate("user").exec(function(err,foundRental){
    if(err){
       res.json("foundRental not found");
    }else{
      res.json(foundRental);
    }
  })
});

// // ---------------- create new rental--------------- 


router.post('/createRental', authMiddleware,function(req, res) {
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate ,space,bathrooms} = req.body;
  const user = res.locals.user;
  // console.log("userffff",user);

  const rental = new Rental({ title, city, street, category, image, shared, bedrooms, description, dailyRate ,space,bathrooms});
  rental.user = user;

 // console.log("rentalfff",rental);
  Rental.create(rental, function(err, newRental) {
    
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});

    return res.json(newRental);
    // console.log(newRental);

  });
});


// ---------------- Delete a lrental  ---------------- 

router.delete("/delete/:id",authMiddleware,function(req,res){
  const user = res.locals.user;
 
  Rental.findOne({ _id:req.params.id })
  .populate("user",'_id')
  .populate({
    path:'booking',
    select:'startDate',
    match : {startDate:{$ng :new Date()}}
  })
  .exec(function(err,foundRental){
//     console.log(foundRental);
// res.json(foundRental);

   if(err){
         return res.status(422).send({errors: normalizeErrors(err.errors)});
           } 

          // if(user.id !== foundRental.user.id ){
          //   return  res.status(422).send({errors:[{title:'Rental delete error', detail:'You are not rental owner'}]});
          // }
         if(foundRental.bookings.length > 0 ){
            return  res.status(422).send({errors:[{title:'Rental delete error', detail:'Can not delete rental with active bookings'}]});
          }

          foundRental.remove(function(err){
            if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          return res.json("ok");
          })
  })

})

// ---------------- Update a rental  ---------------- 

router.patch("/update/:id",authMiddleware,function(req,res){
  const RentalData =  { title, city, street, category, image, shared, bedrooms, description, dailyRate ,space,bathrooms} = req.body;
  const user = res.locals.user;

   console.log("user22",user);
  console.log("RentalData",RentalData);

  Rental.findOne({ _id:req.params.id })
  .populate("user",'_id')
  .populate('booking')
  .exec(function(err,foundRental){
   console.log("foundRentalupdate",foundRental);
    if(err){
       return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    // if(foundRental.user.id !== user.id){
    //    return  res.status(422).send({errors:[{title:'Rental update error', detail:'You are not rental owner'}]});
    // }

    // foundRental.set(rentalData);
    foundRental.title = req.body.title;
    foundRental.city = req.body.city;
    foundRental.street = req.body.street;
    foundRental.dailyRate = req.body.dailyRate;
    foundRental.bathrooms = req.body.bathrooms;
    foundRental.bedrooms = req.body.bedrooms;
    foundRental.space = req.body.space;
    foundRental.image = req.body.image;
    foundRental.shared = req.body.shared;
    foundRental.description = req.body.description;
    foundRental.user = user;
    foundRental.category= req.body.category;
  
    foundRental.save(function (err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json("rental updated");
     })
  })

})


// ---------------- Find all rentals ---------------- 

router.get('/',function(req,res){

      const city = req.query.city;
      const bedrooms = req.query.bedrooms;
      const category = req.query.category;
      // const title = req.query.title;
   
      const query = {
       city:city.toLowerCase(),
       bedrooms:bedrooms,
        category:category.toLowerCase(),
        // title:title.toLowerCase()
      };


       Rental.find(query)
      .select('-bookings')      
      .exec(function(err,foundRentals){

          if(err){
         return res.status(422).send({errors: normalizeErrors(err.errors)});
           } 

          if(foundRentals.length === 0){
            return  res.status(422).send({errors:[{title:'Rental Error', detail:'could not found Rental'}]});
          }

          return  res.json(foundRentals);

     });
 
});



module.exports = router;




