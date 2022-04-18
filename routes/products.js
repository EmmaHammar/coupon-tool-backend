var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors());

router.get('/', function(req, res, next) {
  req.app.locals.db.collection('products').find({}).toArray()
  .then(products => {
    // console.log("products", products);
    res.send(products);
  });
});

module.exports = router;