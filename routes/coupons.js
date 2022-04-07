var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());

router.post('/update', function(req, res) {

  let couponId = req.body.couponId;
  delete req.body.couponId; //so db can be updated with all the other values that comes from req.body but not couponId since that's not aimed to change
    
  req.app.locals.db.collection("coupons").updateOne({'couponId': couponId}, {$set: req.body})
  .then(result => {
    res.json({"code": "Coupon is updated!"});
  });

});

//find coupon based on pickedCouponId
router.get('/:pickedCouponId?', function(req, res, next) {
  // console.log("req.params:", req.params.pickedCouponId);

  req.app.locals.db.collection('coupons').find({'couponId': req.params.pickedCouponId}).toArray()
  .then(coupon => {
    // console.log("coupon", coupon);
    res.send(coupon);
  });
});

//show right couponInfo when editor UI prints
router.post('/show', function(req, res) {

  console.log("req.body:", req.body);
  // res.json({"code": "success!"});

 
  req.app.locals.db.collection("coupons").find({'couponId': req.body.pickedCouponId}).toArray()
  // req.app.locals.db.collection("coupons").find({'couponId': '2'}).toArray()

  .then(result => {
    
    if (req.body.currentStep !== '') {
      // console.log("result", result);
      res.json({"coupon": result});
    }

    else {
      res.json({"dbResult": 'error'});
    }

  });

});


module.exports = router;

//TODO ERR SOMETIMES: Access to fetch at 'https://coupon-tool-backend.herokuapp.com/coupons/update' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

//SAVE FOR LATER:pagination om många produkter
//req.app.locals.db.collection('products').find().skip(20).limit(20).toArray() (tar 20 resultat men hoppar över de 20 första)

//filtrera:
//req.app.locals.db.collection('coupons').find({'carMake': 'Ford', 'carModel': 'Focus}).toArray()
//Prints all ford with carmodel Focus

//sortera
//req.app.locals.db.collection('coupons').find().sort({'modelYear': 1}).toArray()
//descending/ascending 1 = får den äldsta 1948 först, -1 = 2013
//alfabetisk ordning: 'carMake': 1 = börjar på A, -1=börjar på Ö