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
  // console.log("req.body:", req.body);
 
  req.app.locals.db.collection("coupons").find({'couponId': req.body.pickedCouponId}).toArray()
  .then(result => {
    
    if (req.body.currentStep !== '') {
      res.json({"coupon": result});
    }
    else {
      res.json({"dbResult": 'error'});
    }
  });
});

router.post('/add', function(req, res) {
  console.log("req.body:", req.body);

  req.app.locals.db.collection("coupons").insertOne(req.body)
  .then(result => {
    res.json({"code:": "newCoupon saved"});
  });
});

//get all coupons 
router.get('/show/all', function(req, res, next) {
  req.app.locals.db.collection('coupons').find({}).toArray()
  .then(coupons => {
    // console.log("coupons", coupons);
    res.send(coupons);
  });
});


module.exports = router;