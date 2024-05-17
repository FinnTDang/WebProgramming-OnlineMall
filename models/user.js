const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'], // Custom error message for missing input
    maxLength: 100, 
    match: [/^[^\d]+$/, 'Name cannot contain numbers']
  },
  mail: { 
    type: String, 
    required: [true, 'Email is required'], // Custom error message for missing input
    maxlength: 200, 
    unique: true, 
    match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: {
    type: String, 
    required: [true, 'Password is required'], // Custom error message for missing input
    maxlength: 100,
    minlength: [8, 'Password must be at least 8 characters long'] // Custom error message for password length
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'], // Custom error message for missing input
    maxlength: 12, 
    match: [ /^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  country: { 
    type: String, 
    required: [true, 'Country is required'], // Custom error message for missing input
    maxlength: 50, 
    match: [/^[^\d]+$/, 'Country cannot contain numbers']
  },
  city: { 
    type: String, 
    required: [true, 'City is required'], // Custom error message for missing input
    maxlength: 50, 
    match: [/^[^\d]+$/, 'City cannot contain numbers']
  },
  address: { type: String, required: [true, 'Address is required'], maxlength: 300 },
  zip: { 
    type: String, 
    required: [true, 'Zip code is required'], // Custom error message for missing input
    maxlength: 10, 
    match: [ /^[0-9]+$/, 'Zip code must contain only numbers']
  },
  account_type: { 
    type: String, 
    required: [true, 'Account type is required'], // Custom error message for missing input
    maxlength: 50,
    enum: ["store owner", "shopper"] 
  },
  profile_image: { type: String },
  password: { type: String, required: true },
  store_wishlist: [{ type: Schema.Types.ObjectId, ref: "Store" }],
  product_wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  cart: { type: Schema.Types.ObjectId, ref: "Cart"  }
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);
