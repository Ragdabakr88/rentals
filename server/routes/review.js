const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const Payment = require('../models/payment');
const User = require('../models/user');
const Booking = require('../models/booking');
const Review= require('../models/review');
const { authMiddleware } = require('../helpers/auth');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const moment = require('moment');

router.get('/secret',authMiddleware,function(req,res){

  res.json("wdefgtrhyu");
});
// ---------------- create new review ---------------- 

router.post('/:id',authMiddleware,function(req,res){

  const reviewData = req.body;
  // const { bookingId } = req.query;
  const user = res.locals.user;
  const bookingId = req.params.id;

console.log("BookinID" , bookingId);
// console.log("userdwwwef",user);

  Booking.findById(bookingId)
         .populate({path: 'rental', populate: {path: 'user'}})
         .populate('review')
         .populate('user')
         .exec(async (err, foundBooking) => {
          console.log("Bookingwith reviews" , foundBooking);

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    const {rental} = foundBooking;

    if (rental.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create review on your Rental!'}]});
    }

    const foundBookingUserId = foundBooking.user.id;

    if (foundBookingUserId !== user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot write review on someone else booking'}]});
    }

    // const timeNow = moment();
    // const endDate= moment(foundBooking.endDate);

    // // if (!endDate.isBefore(timeNow)) {
    // //    return res.status(422).send({errors: [{title: 'Invalid Date!', detail: 'You can place the review only after your trip is finished'}]});
    // // }

    // if (foundBooking.review) {
    //   return res.status(422).send({errors: [{title: 'Booking Error!', detail: 'Only one review per booking is allowed!'}]});
    // }

    const review = new Review(reviewData);
    review.user = user;
    review.rental = rental;
    foundBooking.review = review;

    try {
      await foundBooking.save();
      const savedReview = await review.save();
      console.log("savedReview",savedReview);

      return res.json(savedReview);
    } catch (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }
  });


       });


// ---------------- Get all reviews in rental---------------- 

router.get('/:id',authMiddleware,function(req,res){
   // const rentalId = req.query.rentalId;
 const rentalId = req.params.id;
 console.log("rentalId",rentalId );

    Review.find({'rental':rentalId})
    .populate("user")
    .exec(function(err,reviews){
       console.log("reviews",reviews );


      if(err){
       return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      return res.json(reviews)
    })


});

// ---------------- Get all reviews rating avg---------------- 

router.get('/:id/rating',authMiddleware,function(req,res){
   const rentalId = req.params.id;

  Review.aggregate([
    {"$unwind": "$rental"},
    {"$group": {
      "_id": rentalId,
      "ratingAvg": {"$avg": "$rating"}
    }}], function (err, result) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json(result[0]['ratingAvg'])
    })
  });
module.exports = router;
