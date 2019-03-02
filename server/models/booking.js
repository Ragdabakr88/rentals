const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user:{type: Schema.Types.ObjectId,ref: 'User'},

    rental: {
      type: Schema.Types.ObjectId,ref: 'Rental'
     },

    endDate: {
      type: Date,required:"Ending date is required"
    },
    startDate:{
      type: Date,required:"Starting date is required"
    },
   days:{
      type: Number,required: true
    },
    guests:{
      type: Number
    },
    totalPrice:{
      type: Number
    },
   payment: { type: Schema.Types.ObjectId, ref: 'Payment'},
   status: { type: String, default: 'pending'},
   review: { type: Schema.Types.ObjectId, ref: 'Review'},
   rental: { type: Schema.Types.ObjectId, ref: 'Rental'},  
     createdAt: { type: Date, default: Date.now }
});

module.exports = Booking = mongoose.model('Booking',bookingSchema);


