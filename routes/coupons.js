var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    // get all
    req.app.locals.db.collection('coupons').find().toArray()
    .then(results => {
        console.log("results all coupons:", results); //[]?
        res.send([{'code': 'ok'}, {'result': results}])
    });

    // res.send('Hej från couponsRouter!');
  
});

// router.post('/add', function(req, res) {
//     //mock from fe
//     let coupon = {
//         pickedCouponId: '1a',
//         couponLogo: '',
//         couponLogoPosition: 'topLeft',
//         couponBackground: '',
//         couponHeading: '',
//         couponText: ''
//     };

//     coupon = req.body;
//     console.log("coupon:", coupon);
//     req.app.locals.db.collection('coupons').updateOne(req.body)
//     .then(results => {
//         // console.log(results);
//         res.json({'code': 'success'})
//         // res.redirect('/show')
//     })

// })

module.exports = router;


//https://www.youtube.com/watch?v=_2i3vqrU6L4
// koppling db =    req.app.locals.db.
//speca vilken collection i db = .collection('couponArrs')

//usersbook -collection: users, orders (alla users ordrar), products (all products)