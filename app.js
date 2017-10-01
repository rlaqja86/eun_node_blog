var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var etag = require('etag');

var index = require('./routes/index');
var admin = require('./routes/admin');
var project = require('./routes/project')
var about = require('./routes/subAbout')
var book = require('./routes/subBook')

var app = express();

// app.enable('etag') // use strong etags
// app.set('etag', 'strong') // same
// app.set('etag', 'weak') // weak etags
app.use(function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    next();
});


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//directory path.
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/jade-bootstrap')))
app.use('/js', express.static(path.join(__dirname, 'js'))); // 나중에 js폴더를 public폴더 안으로 이동한 후 삭제
app.locals.pretty = true;

app.use('/', index);
app.use('/admin', admin);
app.use('/project', project);
app.use('/about', about);
app.use('/book', book);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    // res.redirect('/');
    res.render('_error_404');
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
    res.render('_error');
});

module.exports = app;