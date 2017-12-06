var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var index = require('./routes/index');
var users = require('./routes/users');
var login=require('./routes/login');
var user=require('./routes/user');
var register=require('./routes/register');
var search=require('./routes/search');
var child_query=require('./routes/child_query');


var hospital=require('./routes/hospital');
var  child_register=require('./routes/child_register');
var civil_Affairs=require('./routes/civil_affairs');
var marry_query=require('./routes/marry_query');
var marry_register=require('./routes/marry_register');
var  success=require('./routes/success');
var user_query=require('./routes/user_query');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.engine("html",require("ejs").__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login',login);
app.use('/index', index);
app.use('/users', users);
app.use('/user',user);
app.use('/register',register);
app.use('/search',search);
app.use('/child_query',child_query);

app.use('/child_register',child_register);
app.use('/civil_Affairs',civil_Affairs);
app.use('/hospital',hospital);
app.use('/marry_query',marry_query);
app.use('/marry_register',marry_register);
app.use('/success',success);
app.use('/user_query',user_query);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
