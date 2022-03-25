var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection('products').find({}).toArray()
  .then(products => {
    console.log("products", products);
    res.json({'products': products});
  });
});

module.exports = router;