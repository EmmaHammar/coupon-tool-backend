var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());

router.post('/update', function(req, res) {

  let couponId = req.body.couponId;
  delete req.body.couponId; //so db can be updated with all the other values that comes from req.body but not couponId since that's not aimed to change
    
  req.app.locals.db.collection("coupons").updateOne({'couponId': couponId}, {$set: req.body})
  .then(result => {
    res.json({"code": "success!"});
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
  
module.exports = router;


//SAVE FOR LATER:pagination om många produkter
//req.app.locals.db.collection('products').find().skip(20).limit(20).toArray() (tar 20 resultat men hoppar över de 20 första)

//filtrera:
//req.app.locals.db.collection('coupons').find({'carMake': 'Ford', 'carModel': 'Focus}).toArray()
//Prints all ford with carmodel Focus

//sortera
//req.app.locals.db.collection('coupons').find().sort({'modelYear': 1}).toArray()
//descending/ascending 1 = får den äldsta 1948 först, -1 = 2013
//alfabetisk ordning: 'carMake': 1 = börjar på A, -1=börjar på Ö