const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../helpers/auth');
const multer = require('multer');


const fileFilter = (req,file,cb) => {
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		cb(null,true);
	}else{
		cb(newErroe("Invalid file type,only JPEG and PNG is allowed!"),false);
	  }
	}



var storage = multer.diskStorage({
	fileFilter,
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,  Date.now()+'-'+file.originalname);
   
  }
})
 
var upload = multer({storage});



var singleupload = upload.single('image') ;


router.post('/image-upload',function(req,res,next){
	singleupload(req,res,function(err){
  if (err) {
 return  res.status(422).send({errors:[{title:'Image upload error', detail:err.message}]});
  }
       
        img_url = '/uploads/' + req.file.filename
      
         // img_url = req.protocol + '://' + req.headers.host + '/' +  'uploads/' + req.file.filename
        return res.json({'imageUrl':img_url});

   });
});

module.exports = router;