const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const countries = require("../public/countries.json");
const mongoose = require("mongoose");

async function authenticate(req, res) {
  const user = await User.findOne({ mail: `${req.body.mail}` }).exec(); 
  console.log(user);
  if (!user) { res.send('No account has been created with this email.') }
  if (user.password == req.body.password) {
    console.log('Session before user match:', req.session.user);
    console.log('match!');
    //handle session
    req.session.regenerate(function (err) {
      if (err) { console.log(err); }
      req.session.user = user;
      req.session.save(function (err) {
        if (err) { console.log(err); }
        console.log('Session after user match:', req.session.user);
        res.redirect('/');
      })
    })
  } else {
    { res.redirect('back'); }
  } 
}

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
    res.redirect('/');
})


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
exports.user_authenticate = asyncHandler(async (req, res, next) => {
  if (req.method == "POST") {
    authenticate(req, res);
  }
  if (req.method == "GET") {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/signin");
    }
  }
})
