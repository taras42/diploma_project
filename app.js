var express = require('express');
var path = require('path');
var cons = require('consolidate');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var models = require("./models");

var app = express();

var server = http.createServer(app);
var io = require("socket.io")(server);

// Routes

var routes = require('./routes/index');
var users = require('./routes/users');
var sensors = require('./routes/sensors');
var controlledAreas = require('./routes/controlledAreas');
var controlledArea = require('./routes/controlledArea');
var ioRoutes = require('./routes/io');

// view engine setup
app.engine('html', cons.underscore);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'web')));


// mapping routes prefixes

app.use('/', routes);
app.use('/users', users);
app.use('/sensors', sensors);
app.use('/controlledAreas', controlledAreas);
app.use('/controlledArea', controlledArea);
app.use('/io', ioRoutes(io));

// #################################################

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

models.sequelize.sync().then(function () {

    server.listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });

    io.on('connection', function (socket) {
      
      console.log('connected');

      socket.on('sensor:trigger', function (data) {
        console.log(data);
      });
    });
});

module.exports = app;