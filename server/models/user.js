const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const userSchema = new Schema({

  username:{
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
    required: true 
  },
  email:{ 
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
    unique : true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password:{ 
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
    required: 'Password is required'
  },
  rentals:[{
    type: Schema.Types.ObjectId,
    ref: 'Rental'
 }],
 stripeCustomerId:String,//id of this user(customer) in stripe
 revenue:Number,//all money user collected from rental bookimgs
 bookings: [{
  type: Schema.Types.ObjectId,ref: 'Booking'
  }],

});

//comparing correct password
//--------------------------

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
}

//hashing password after saving user in db
//------------------------------------------

userSchema.pre('save',function(next){

  const user = this;

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
  });
})

module.exports = User= mongoose.model('User', userSchema);


