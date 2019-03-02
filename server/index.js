const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const configDataBase = require("./config");
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const methodOverride = require("method-override");


const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/rentals', require('./routes/rentals'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/payment', require('./routes/payment'));
app.use('/api/v1/review', require('./routes/review'));
app.use('/api/v1/image-upload', require('./routes/image-upload'));
//methodOverride midleware
app.use(methodOverride('_method'));
app.use('/uploads',express.static('uploads'));

const appPath = path.join(__dirname, '..', 'uploads');
  app.use('/uploads',express.static(appPath));

if (process.env.NODE_ENV === 'production') {
  const appPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}



// mongoose connect
mongoose.connect(configDataBase.mongoDbUrl ,{ useNewUrlParser: true } )
.then( 
	() =>{
       const fakeDb = new FakeDb();
       // fakeDb.seeDb();
	});


const PORT = process.env.PORT || 3001;
app.listen(PORT,function(){
	console.log("running 3001");
});