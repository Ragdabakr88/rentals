const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ALLOWED_RATINGS = [1,2,3,4,5];

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
  booking: { type: Schema.Types.ObjectId, ref: 'Booking'},
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
  rating: Number,
  createdAt: { type: Date, default: Date.now },


});

reviewSchema.pre('save',function(next){
	if(ALLOWED_RATINGS.indexOf(this.rating) >=0){
		next();
	}else{
		const err = new Error({rating:'Invalid rating'});
		err.errors = {};
		err.errors.rating = {message:'This rating is not allowed!'}
		next(err);
	}
});







module.exports = mongoose.model('Review', reviewSchema );