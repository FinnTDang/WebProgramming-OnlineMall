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
const userRouter = require('./routes/user');
const contactRouter = require('./routes/contact');
const feesRouter = require('./routes/fees');
const faqRouter = require('./routes/faq');
const aboutRouter = require('./routes/about');
const copyrightRouter = require('./routes/copyright');
const termsRouter = require('./routes/terms');
const policyRouter = require('./routes/policy');
const storeRouter = require('./routes/store');

const app = express();

// Establish connection to database for data CRUD
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://dctrung0108:xeXe-71.XeeX@cluster0.xqftmck.mongodb.net/mall?retryWrites=true&w=majority&appName=Cluster0";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Establish user session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://dctrung0108:xeXe-71.XeeX@cluster0.xqftmck.mongodb.net/mall?retryWrites=true&w=majority&appName=Cluster0"
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/contact', contactRouter);
app.use('/fees', feesRouter);
app.use('/faq', faqRouter);
app.use('/about', aboutRouter);
app.use('/copyright', copyrightRouter);
app.use('/terms', termsRouter);
app.use('/policy', policyRouter);
app.use('/', storeRouter);
app.use(express.static(path.join(__dirname, "public")));

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
