var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var app = express();
var index = require('./routes/index');
var users = require('./routes/users');
var login=require('./routes/login');
var user=require('./routes/user');
var register=require('./routes/register');
var search=require('./routes/search');
var child_query=require('./routes/child_query');
var fingerprinter_register=require('./routes/fingerprinter_register');
var add_page=require('./routes/add_page');
var modify_page=require('./routes/modify_page');

var civil_query=require('./routes/civil_query');
var divorce_register=require('./routes/divorce_register');
var hospital=require('./routes/hospital');
var hospita_query = require('./routes/hospital_query');
var  child_register=require('./routes/child_register');
var civil_Affairs=require('./routes/civil_affairs');
var marry_query=require('./routes/marry_query');
var marry_register=require('./routes/marry_register');
var  success=require('./routes/success');
var user_query=require('./routes/user_query');
var patient_expense=require('./routes/patient_expense');
var police_office=require('./routes/police_office');
var social_securityAdministration=require('./routes/social_securityAdministration');

var divorce_application=require('./routes/divorce_application');
var idcard_application=require('./routes/idcard_application');
var information_modification=require('./routes/information_modification');
var marry_application=require('./routes/marry_application');
var securityCard_application=require('./routes/securityidCard_application');

var social_query=require('./routes/social_query');
var social_register=require('./routes/social_register');

var print_birthcard=require('./routes/print_birthcard');
var print_hukou=require('./routes/print_hukou');
var print_idcard=require('./routes/print_idcard');

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
//session config
app.use(cookieParser('sessiontest'));
app.use(session({
    secret:'sessiontest',
    resave:true,
    saveUninitialized:true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/',login);
app.use('/index', index);
app.use('/users', users);
app.use('/',user);
app.use('/register',register);
app.use('/search',search);
app.use('/child_query',child_query);
app.use('/fingerprint_register',fingerprinter_register);
app.use('/child_register',child_register);
app.use('/civil_Affairs',civil_Affairs);
app.use('/hospital',hospital);
app.use('/hospital_query',hospita_query);
app.use('/marry_query',marry_query);
app.use('/marry_register',marry_register);
app.use('/success',success);
app.use('/user_query',user_query);
app.use('/patient_expense',patient_expense);
app.use('/police_office',police_office);
app.use('/civil_query',civil_query);
app.use('/divorce_register',divorce_register);

app.use('/divorce_application',divorce_application);
app.use('/idcard_application',idcard_application);

app.use('/information_modification',information_modification);
app.use('/social_securityAdministration',social_securityAdministration);
app.use('/marry_application',marry_application);
app.use('/securityCard_application',securityCard_application);
app.use('/add_page',add_page);
app.use('/modify_page',modify_page);

app.use('/social_query',social_query);
app.use('/social_register',social_register);

app.use('/print_birthcard',print_birthcard);
app.use('/print_hukou',print_hukou);
app.use('/print_idcard',print_idcard);

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
