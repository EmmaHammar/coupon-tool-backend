var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('funkar nodemon');
});

module.exports = router;


//https://www.youtube.com/watch?v=_2i3vqrU6L4