const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/user');
const storeRouter = require('./routes/store');

const app = express();


//Establish connection to database for data CRUD
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://dctrung0108:xeXe-71.XeeX@cluster0.xqftmck.mongodb.net/mall?retryWrites=true&w=majority&appName=Cluster0";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

//Establish user session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://dctrung0108:xeXe-71.XeeX@cluster0.xqftmck.mongodb.net/mall?retryWrites=true&w=majority&appName=Cluster0"
  })
}));
// app.use(passport.authenticate('session'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', storeRouter);


// catch 404 and forward to error handler
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
