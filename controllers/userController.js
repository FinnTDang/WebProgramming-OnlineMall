const User = require("../models/user");
const Store = require("../models/store");
const Cart = require("../models/cart");
const Item = require("../models/item");
const Product = require("../models/product");
const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const countries = require("../public/countries.json");
const mongoose = require("mongoose");
const product = require("../models/product");

exports.user_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: User list");
});

// Display personal detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    const user = await User.findOne({ _id: req.session.user._id }).exec();
    if (user) {
      res.render('account', { title: 'Account', menu: 'Personal', user: user });
    } else {
      res.status(404).send('User not found');
    }
  }
});

// Display business detail page for a specific Store Owner.
exports.business_detail = asyncHandler(async (req, res, next) => {
  let displayBusiness = true;
  const user = await User.findById(req.session.user._id);
  let is_store_owner = false;
  if (user.account_type === 'store owner') {
    is_store_owner = true;
    const store = await Store.findOne({ owner: user._id });
    res.render('account', { title: 'Account', menu: 'Business', user, store, displayBusiness, is_store_owner});
  } else {
    res.render('account', { title: 'Account', menu: 'Business', user, displayBusiness, is_store_owner});
  }
});

//Display user login
exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.render('account', { title: 'Sign in', operation: 'sign in', error: req.path == "/signin/verify" ? "Wrong email or password" : null });
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

  const new_cart = new Cart({
    _id: new mongoose.Types.ObjectId(),
    user: new_user,
    items: []
  });
  await new_cart.save();

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
  res.render('account_info_update', { user: req.session.user, countries: countries, updateBusiness: false});
});

exports.business_detail_update_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.session.user._id);
  const store = await Store.findOne({ owner: user._id });
  res.render('account_info_update', { user: user, store: store, updateBusiness: true});
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
  current_user.address = new_user_info.address; 
  current_user.city = new_user_info.city; 
  current_user.password = new_user_info.password;
  current_user.profile_image = `/images/users/${req.params.id}.jpeg`; 

  await current_user.save();

  req.session.user = current_user;

  console.log(req.session.user);

  res.redirect('/account');
});

exports.business_detail_update_post = asyncHandler(async (req, res, next) => {
  const current_user = await User.findOne({ _id: req.params.id });
  if (!current_user) {
    return res.status(404).render('error');
  }

  const store = await Store.findOne({ owner: current_user._id });
  if (!store) {
    return res.status(404).render('error');
  }

  const { business_name, store_name, store_category, store_logo } = req.body;

  if (business_name) store.business_name = business_name;
  if (store_name) store.store_name = store_name;
  if (store_category) store.store_category = store_category;
  if (store_logo) store.store_logo = store_logo;

  await store.save();
  
  res.redirect('/account/business');
});


exports.user_password_reset_get = asyncHandler(async (req, res, next) => {
  res.render('password');
})

exports.user_password_reset_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ mail: req.body.mail }).select("mail").exec();
  const user_mail = user.mail;
  console.log(user_mail);

  if (!user_mail) {
    res.redirect(404, "/reset-password");
  } else {
    res.redirect('/reset-password/' + user_mail);
  }
});

exports.get_bridge = asyncHandler(async (req, res, next) => {
  const password_reset_code = new mongoose.Types.ObjectId();
  const reset_path = '/reset-password/' + req.params.mail + '/' + password_reset_code.toString();

  res.render('password', { bridge: true, reset_url: reset_path, mail: req.params.mail });
});

exports.password_change_get = asyncHandler(async (req, res, next) => {
  res.render('password', { change: true, path: req.path });
})

exports.password_change_post = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ mail: req.params.mail }).exec();

  user.password = req.body.new_password;

  await user.save();

  res.redirect('/signin');
});

// Handle Authentication - Used as middleware
exports.user_signin_post = asyncHandler(async (req, res, next) => {
  if (req.method == "POST") {
    const user = await User.findOne({$or: [{mail: req.body.mail}, {phone: req.body.mail}] }).exec(); 
    console.log(user);
    if (!user) { res.send('No account has been created with this email.'); }
    if (user.password == req.body.password) {
      req.session.regenerate(function (err) {
        if (err) { return next(err) }
        req.session.user = user;
        req.session.save(function (err) {
          if (err) { return next(err) }
          console.log('Session after user match:', req.session.user);
          res.redirect('/account');
        })
      }) 
    } else {
      res.redirect('back'); 
    }  
  }
});

exports.user_brief = asyncHandler(async (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
});

exports.user_authenticate = asyncHandler(async (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/signin');
  }
  next();
})

exports.user_signout = asyncHandler( async (req, res, next) => {
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/signin')
    })
  })
});

exports.user_cart_get = asyncHandler( async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.session.user })
    .populate({path: 'items', 
      populate: { path: 'product', 
        populate: { path: 'store' } 
    }})
    .exec();


  // await cart.populate('items').exec();

  if (!cart || (cart && cart.items.length === 0)) {
    res.render('cart', { title: 'Cart', items: [] });
  } else {
    console.log(cart.items)
    let subtotal = 0;

    cart.items.forEach(item => {
        subtotal += item.quantity * item.product.price; 
    });

    const shipping = 0; 
    const transactionFee = 2;
    const total = subtotal + shipping + transactionFee;
    res.render('cart', { title: 'Cart', items: cart.items, subtotal, total, from_buy_now: req.from_buy_now, product_url: req.product_url});
  }
});

exports.user_cart_add_post = asyncHandler( async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.session.user._id }).exec();
  const product = await Product.findOne({ _id: req.body.product }).exec();
  const item = await Item.findOne({ product: req.body.product, cart: cart._id });

  if (item == null) {
    const new_item = new Item({
      _id: new mongoose.Types.ObjectId(),
      cart: cart,
      product: req.body.product,
      quantity: req.body.product_quantity,
      aggregate_price: req.body.product_quantity * product.price
    });
  
    await new_item.save();
  
    cart.items.push(new_item);
  
  } else {
    item.quantity = parseInt(item.quantity) + parseInt(req.body.product_quantity);
    item.aggregate_price = item.quantity * product.price;
    await item.save();
  }
  await cart.save();
  if (req.body.actionType === 'buy') {
    req.from_buy_now = true;
    req.product_url = "/stores/" + product.store;
    next();
  } else {
    res.redirect('back');
  }
});

exports.user_cart_update_post = asyncHandler( async(req, res, next) => {
    if (req.body.quantity == 0) {
      await Item.findOneAndDelete({_id: req.body.item}).exec();
    } else {
      await Item.findOneAndUpdate({_id: req.body.item}, {
        quantity: req.body.quantity
      }).exec();
    }

    res.redirect('back');
});

exports.checkout_post = asyncHandler( async(req, res, next) => {
  // create a new order with the data
  let sum = 0;
  let product_ids = [];

  const items = await Item.find({ _id: { $in: req.body.items } }).exec();
  for (let i = 0; i < req.body.items.length; i++) {
    items[i].quantity = req.body.items.quantities[i];
    items[i].aggregate_price = parseInt(items[i].product.price) * parseInt(req.body.items.quantities[i]);
    sum = sum + items[i].aggregate_price;
    await items[i].save();

    product_ids.push(items[i].product);
  }
  const new_order = new Order({
    _id: new mongoose.Types.ObjectId,
    user: req.session.user._id,
    items: req.body.items,
    sum: sum
  })
  await new_order.save();

  // change the quantity of products
  const products = await Product.find({ _id: { $in: product_ids } }).exec();
  for (let i = 0; i < req.body.items.length; i++) {
    products[i].quantity = parseInt(products[i].quantity) - parseInt(req.body.items.quantities[i]);
    
    await products[i].save();
  }

  // delete the instances from the cart
  await Item.findByIdAndDelete({ $in: req.body.items }).exec();

  res.redirect('/successful_order');
});

// exports.user_order_get = asyncHandler( async(req, res, next) => {
//   const orders = await Order.find({ user: req.session.user._id }).exec();

//   res.render('orders', { orders: orders });
// });

exports.user_wishlist_post = asyncHandler( async(req, res, next) => {
  const user = await User.findOne({ _id: req.session.user._id }).exec();

  // Turn id objects into strings
  let wishlisted_stores = []; 
  let wishlisted_products = [];
  user.product_wishlist.forEach((item) => wishlisted_products.push(item.toString()));
  user.store_wishlist.forEach((item) => wishlisted_stores.push(item.toString()));

  console.log('wishlisted_stores:', wishlisted_stores);
  console.log('wishlisted_products:', wishlisted_products);
  console.log();

  if (req.body.type == "store" && !(wishlisted_stores.includes(req.body.store))) {
    user.store_wishlist.push(req.body.store);
    await user.save();
  } else if (req.body.type == "product" && !(wishlisted_products.includes(req.body.product))) {
    user.product_wishlist.push(req.body.product);
    await user.save();
  } else if (req.body.type == "store" && (wishlisted_stores.includes(req.body.store))) {
    const index = user.store_wishlist.indexOf(req.body.store);
    user.store_wishlist.splice(index, 1);
    await user.save();
  } else if (req.body.type == "product" && (wishlisted_products.includes(req.body.product))) {
    const index = user.product_wishlist.indexOf(req.body.product);
    user.product_wishlist.splice(index, 1);
    await user.save();
  }

  res.redirect('back');
});

exports.user_wishlist_get = asyncHandler( async(req, res, next) => {
  const user = await User.findOne({ _id: req.session.user._id }).populate('store_wishlist').populate('product_wishlist').exec();

  const wishlist_items = user.store_wishlist + user.product_wishlist;

  console.log(wishlist_items);

  res.render('wishlist', {
    title: 'Wishlist',
    items: wishlist_items,
    stores: user.store_wishlist, 
    products: user.product_wishlist
  });
});