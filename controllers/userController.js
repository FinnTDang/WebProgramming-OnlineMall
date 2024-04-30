const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const Store = require("../models/store");
const countries = require("../public/countries.json");
const mongoose = require("mongoose");

//Configure passport strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  try {
    const user = await User.findOne({ mail: `${username}` }).exec();
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  } catch (e) {
    return cb(e);
  }
}))

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { 
      id: user._id, 
      username: user.mail, 
      name: user.name, 
      profile_image: user.profile_image 
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

exports.user_authenticate = function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
};

exports.user_logout = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  console.log("Prompt user data");
  next();
});

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('account', { 
    operation: "register", 
    countries: countries,
    title: "Sign up"
  });
});

// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
    if (err) { return next(err); }

    const new_user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.first_name + " " + req.body.last_name,
      mail: req.body.mail,
      phone: req.body.phone,
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
      zip: req.body.zip,
      account_type: req.body.account_type,
      profile_image: req.file,
      hashed_password: hashedPassword,
      salt: salt,
    });
    await new_user.save();
  },

    // if (req.body.account_type == "store owner") {
    //   const new_store = new Store({
    //     _id: new mongoose.Types.ObjectId(),
    //     owner: User.findOne({ mail: `${mail}` }).exec()._id,
    //     business_name: req.body.business_name,
    //     store_name: req.body.store_name,
    //     store_category: req.body.store_category,
    //     store_logo: req.body.store_logo,
    //   });
    //   await new_store.save();
    // }}, 

    function(err) {
      if (err) { return next(err); }
      const user = {
        id: this._id,
        username: req.body.mail
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    })
  });


// Handle User delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete POST");
});

// Display User update form on GET.
exports.user_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update GET");
});

// Handle User update on POST.
exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User update POST");
});

