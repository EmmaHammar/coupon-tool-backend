var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var couponsRouter = require('./routes/coupons');
var productsRouter = require('./routes/products');


var app = express();

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect('mongodb+srv://emmahammar:Hejhej123!@taskinfo.uvgzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})
.then(client => {
    console.log('Vi är uppkopplade mot db');

    const db = client.db('couponToolDb');
    // const db = client.db('coupon-tool'); //which one use? 
    app.locals.db = db;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/coupons', couponsRouter);
app.use('/products', productsRouter);

module.exports = app;
