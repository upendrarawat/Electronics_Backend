var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var brandsRouter = require('./routes/brands');
var productsRouter = require('./routes/products');
var productdetailsRouter = require('./routes/productdetails');
var bannerRouter = require('./routes/banner');
var categorybannerRouter = require('./routes/categorybanner');
var adminsRouter = require('./routes/admins');
var userRouter = require('./routes/userinterface');
var userAccountRouter = require('./routes/useraccount')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/brands', brandsRouter);
app.use('/products', productsRouter);
app.use('/productdetails', productdetailsRouter);
app.use('/banner', bannerRouter);
app.use('/categorybanner', categorybannerRouter);
app.use('/admins', adminsRouter);
app.use('/userinterface', userRouter);
app.use('/useraccount', userAccountRouter);



app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
