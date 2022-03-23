var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());

// router.get('/', function(req, res, next) {

//     // update coupon based on couponId
//     req.app.locals.db.collection('coupons').updateOne({'couponId': '2'}, {$set: {'couponHeading': 'Påskharen är här!'}})
//     .then(result => {

//         // //filter and log all couponIds:
//         // for (coupon in coupons) {
//         //     console.log("coupons[coupon]:", coupons[coupon].couponId);
//         // }

//         res.send([{'code': 'ok'}])
//     });
// });

//TODO change {$set: {'logo': req.body.logo}}) TO dynamical 'logo'
router.post('/update', function(req, res) {
    console.log("req.body:", req.body);

    //destructure object to get only {contentKey : contentValue}
    // const contentObj = ( ({[req.body.logo]}) => ({[req.body.logo]}))(req.body);

    req.app.locals.db.collection("coupons").updateOne({'couponId': req.body.couponId}, {$set: {'logo': req.body.logo}})
    .then(result => {
      console.log("result", result);
      res.json({"code": "success"});
    });
  
  });
  


module.exports = router;


//https://www.youtube.com/watch?v=_2i3vqrU6L4
// koppling db =    req.app.locals.db.
//speca vilken collection i db = .collection('couponArrs')

//usersbook -collection: users, orders (alla users ordrar), products (all products)


// const myFunction = async function (x, y) {
//     return [
//         x, 
//         y,
//     ];
// };

// //startFunction
// const start = async function (a, b) {
//     const result = await myFunction('test', 'test');
//     console.log(result);
// };

// //call start
// start()


//SAVE FOR LATER:pagination om många produkter
//req.app.locals.db.collection('products').find().skip(20).limit(20).toArray() (tar 20 resultat men hoppar över de 20 första)


//filtrera:
//req.app.locals.db.collection('coupons').find({'carMake': 'Ford', 'carModel': 'Focus}).toArray()
//Prints all ford with carmodel Focus

//sortera
//req.app.locals.db.collection('coupons').find().sort({'modelYear': 1}).toArray()
//descending/ascending 1 = får den äldsta 1948 först, -1 = 2013
//alfabetisk ordning: 'carMake': 1 = börjar på A, -1=börjar på Ö


//get all
    // req.app.locals.db.collection('coupons').find({'couponId': '1'}).toArray()
    //.then(coupons => {
