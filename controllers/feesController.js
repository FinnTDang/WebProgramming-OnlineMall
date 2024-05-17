const Fee = require("../models/fees");

// Display list of all fees.
exports.fees_list = async function(req, res) {
    try {
        const fees = await Fee.find({});
        res.render('fees', { title: 'Fees', fees: fees, isAdmin: req.session.user && req.session.user.account_type === 'admin' });
    } catch (err) {
        res.render('error', { error: err });
    }
};

// Display Fee create form on GET.
exports.fees_create_get = function(req, res) {
    res.render('fee_form', { title: 'Create Fee' });
};

// Handle Fee create on POST.
exports.fees_create_post = async function(req, res) {
    try {
        const { fee_type, description, amount } = req.body;
        const newFee = new Fee({
            fee_type: fee_type,
            description: description,
            amount: amount
        });
        await newFee.save();
        res.redirect('/fees');
    } catch (err) {
        res.render('error', { error: err });
    }
};

// Display Fee update form on GET.
exports.fees_update_get = async function(req, res) {
    try {
        const fee = await Fee.findById(req.params.id);
        res.render('fee_form', { title: 'Edit Fee', fee: fee });
    } catch (err) {
        res.render('error', { error: err });
    }
};

// Handle Fee update on POST.
exports.fees_update_post = async function(req, res) {
    try {
        await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/fees');
    } catch (err) {
        res.render('error', { error: err });
    }
};

// Display detail page for a specific Fee.
exports.fees_detail = async function(req, res) {
    console.log("Inside fees_detail function"); // Add this line
    try {
        const fee = await Fee.findById(req.params.id);
        console.log("Found fee:", fee); // Add this line
        res.render('fee_detail', { title: 'Fee Detail', fee: fee });
    } catch (err) {
        console.log("Error:", err); // Add this line
        res.render('error', { error: err });
    }
};
