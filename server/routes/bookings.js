const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const Payment = require('../models/payment');
const User = require('../models/user');
const Booking = require('../models/booking');
const { authMiddleware } = require('../helpers/auth');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const moment = require('moment');



// ---------------- Stripe payment---------------- 
const stripe = require('stripe')('sk_test_29ORbpiJP6CSE2em5AzxGPlB');



// ---------------- Test auth middleware ---------------- 
router.get('/',authMiddleware,function(req,res){
  res.json({"createBooking":true});
});

// ---------------- Find all booking ---------------- 

router.get('/',function(req,res){
  Booking.find({},function(err,foundBookings){
    if(err){
      res.status(422).send({errors:[{title:'Booking Error', detail:'could not found Booking'}]});
    }else{
      res.json(foundBookings);
    }
  })
});


// ---------------- Get logged in user bookings ---------------- 

router.get("/manage",authMiddleware,function(req,res){
 const user = res.locals.user;
 console.log("userbooking",user);
  Booking.where({user})
 .populate("rental")
 .populate("user")
 .populate("payment")
 .exec(function(err,foundBookings){
    if(err){
       res.json("foundbookings not found");
    }else{
      res.json(foundBookings);
    }
  });
});

// ---------------- Create booking ---------------- 

router.post('/createBooking',authMiddleware,function(req,res){
const { startDate, endDate, totalPrice, guests, days, rental, token } = req.body;
  const user = res.locals.user;

  const booking = new Booking({ startDate, endDate, totalPrice, guests, days});

  Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundRental) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (isValidBooking(booking, foundRental)) {
    
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);
      const { payment, err } = await createPayment(booking, foundRental.user, token);

      if (payment) {
        booking.payment = payment;
        booking.save(function(err) {
          if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }

          foundRental.save()
          User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

          return res.json({startDate: booking.startDate, endDate: booking.endDate});
        });
      } else {

        return res.status(422).send({errors: [{title: 'Payment Error', detail: err}]});
      }
    } else {

       return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
    }
  })
});



function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {

    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startDate);
      const proposedEnd = moment(proposedBooking.endDate);

      const actualStart = moment(booking.startDate);
      const actualEnd = moment(booking.endDate);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}


async function createPayment(booking, toUser, token) {
  const { user } = booking;

  debugger;
  const customer = await stripe.customers.create({
    source: token.id,
    email: user.email
  });

  if (customer) {
    User.update({_id: user.id}, { $set: {stripeCustomerId: customer.id}}, () => {});

    const payment = new Payment({
      fromUser: user,
      toUser,
      fromStripeCustomerId: customer.id,
      booking,
      tokenId: token.id,
      amount: booking.totalPrice * 100 * 0.8
    });

    try {
      const savedPayment = await payment.save();
      return {payment: savedPayment};

    } catch(err) {
      return {err: err.message};
    }

  } else {
    return {err: 'Cannot process Payment!'}
  }


}


module.exports = router;




