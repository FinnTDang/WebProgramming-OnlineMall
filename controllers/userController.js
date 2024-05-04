const User = require("../models/user");
const Store = require("../models/store");
const asyncHandler = require("express-async-handler");
const countries = require("../public/countries.json");
const mongoose = require("mongoose");

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).exec();
  res.render('user', { user: user });
  console.log(req.params.id);
});

//Display user login
exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.render('account.pug', { title: 'Sign in', operation: 'sign in', error: req.path == "/signin/verify" ? "Wrong email or password" : null });
});

// Display User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('account', { 
    operation: "sign up", 
    countries: countries,
    title: "Sign up"
  });
});

// Handle User create on POST.
exports.user_create_post = asyncHandler(async (req, res, next) => {
  //Saving data to database
  const new_user = new User({
    _id: req.id,
    name: req.body.first_name + " " + req.body.last_name,
    mail: req.body.mail,
    phone: req.body.phone,
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
    zip: req.body.zip,
    account_type: req.body.account_type,
    password: req.body.password,
    profile_image: '/images/users/' + req.id.toString() + '.jpeg',
  });
  await new_user.save();

  //Instant signing in after signing up successfully
  const user = await User.findOne({ mail: `${req.body.mail}` }).exec(); 
  req.session.regenerate(function (err) {
    if (err) { return next(err) }
    req.session.user = user;
    req.session.save(function (err) {
      if (err) { return next(err) }
      console.log('Session after user match:', req.session.user);
      if (req.body.account_type == "store owner") {
        res.redirect('/stores/create');
      } else {
        res.redirect('/');
      }
    })
  })  
});

// Handle User delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User delete POST");
});


exports.user_info_update_get = asyncHandler(async (req, res, next) => {
  console.log(req.session.user);
  res.render('user_info_update', { user: req.session.user, countries: countries, is_store_owner: req.session.user.account_type == "store owner" });
});

// Handle User update on POST.
exports.user_info_update_post = asyncHandler(async (req, res, next) => {
  const current_user = await User.findOne({ _id: req.params.id });

  const new_user_info = req.body;

  current_user.mail = new_user_info.mail; 
  current_user.name = new_user_info.name; 
  current_user.phone = new_user_info.phone; 
  current_user.zip = new_user_info.zip; 
  current_user.country = new_user_info.country; 
  current_user.account_type = new_user_info.account_type; 
  current_user.address = new_user_info.address; 
  current_user.city = new_user_info.city; 

  await current_user.save();

  req.session.user = current_user;

  console.log(req.session.user);

  res.redirect('/users/' + req.params.id);
  // res.status(200).json({ message: 'User information updated successfully' });
});

exports.user_password_update_post = asyncHandler(async (req, res, next) => {

})

// Handle Authentication - Used as middleware
exports.user_signin_post = asyncHandler(async (req, res, next) => {
  if (req.method == "POST") {
    const user = await User.findOne({ mail: `${req.body.mail}` }).exec(); 
    console.log(user);
    if (!user) { res.send('No account has been created with this email.') }
    if (user.password == req.body.password) {
      req.session.regenerate(function (err) {
        if (err) { return next(err) }
        req.session.user = user;
        req.session.save(function (err) {
          if (err) { return next(err) }
          console.log('Session after user match:', req.session.user);
          res.redirect('/');
        })
      }) 
    } else {
      res.redirect('back'); 
    }  
  }
});

// Handle user layout variable
exports.user_brief = asyncHandler(async (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

//Handle authentication for sites
exports.user_authenticate = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/signin');
  }
  next();
})

// Handle signing out.
exports.user_signout = asyncHandler( async (req, res, next) => {
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
});


