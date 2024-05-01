const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const countries = require("../public/countries.json");
const mongoose = require("mongoose");


exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  // res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  console.log("Prompt user data");
  next();
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
    password: req.body.password,
  });
  await new_user.save();

  //Instant signing in after signing up successfully
  const user = await User.findOne({ mail: `${req.body.mail}` }).exec(); 
  req.session.regenerate(function (err) {
    if (err) { console.log(err); }
    req.session.user = user;
    req.session.save(function (err) {
      if (err) { console.log(err); }
      console.log('Session after user match:', req.session.user);
      res.redirect('/');
    })
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


