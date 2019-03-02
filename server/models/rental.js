const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
 
    title: {
      type: String,required: true
    },
    city: {
      type: String,required: true,lowercase:true
    },
    street:{
      type: String,
      required: true,min:[4,'Too short , min is 4 chracters']
    },
    category:{
      type: String,required: true,lowercase:true
    },
    image:{
      type: String,
      required: true
    },
    bedrooms:{
      type: Number,
      required: true
    },
      description:{
      type: String,
      required: true
    },
    dailyRate:{
        type: Number,
        required: true
    },
    shared:{
     type: Boolean
    },
    space:{
      type: Number,
      required: true
    },
    bathrooms:{
      type: Number,
        required: true
    },
     createdAt: { type: Date, default: Date.now },
     user: { type: Schema.Types.ObjectId, ref: 'User' },
     bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
     review: { type: Schema.Types.ObjectId, ref: 'Review' },
});

module.exports = Rental = mongoose.model('Rental',rentalSchema);


