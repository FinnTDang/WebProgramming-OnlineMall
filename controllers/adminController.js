const User = require("../models/user");
const Store = require("../models/store");
const Fee = require("../models/fees");

// Admin login functionality
exports.admin_login_post = function(req, res) {
    // Implement admin login authentication logic here
};

// Display Fee page for admin
exports.admin_fee_get = async function(req, res) {
    try {
        const fees = await Fee.find({});
        res.render('fees', { title: 'Fees', fees: fees });
    } catch (err) {
        res.render('error', { error: err });
    }
};

// Display list of all shoppers and stores for admin
exports.admin_accounts_get = async function(req, res) {
    try {
        const users = await User.find({});
        const shoppers = users.filter(user => user.account_type === 'shopper');
        const storeOwners = users.filter(user => user.account_type === 'store owner');
        res.render('admin', { title: 'Admin', shoppers: shoppers, storeOwners: storeOwners });
    } catch (err) {
        res.render('error', { error: err });
    }
};

// adminController.js

exports.is_admin = function(req, res, next) {
    // Check if user is an admin
    if (req.session.user && req.session.user.account_type === 'admin') {
        // User is an admin, proceed to next middleware or route handler
        next();
    } else {
        // User is not an admin, redirect or handle accordingly
        res.status(403).send('Forbidden'); // For example, send a 403 Forbidden status
    }
};

