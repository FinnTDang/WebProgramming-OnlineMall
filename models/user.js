const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  mail: { type: String, required: true, maxlength: 200 },
  phone: { type: String, required: true, maxlength: 12 },
  country: { type: String, required: true, maxlength: 50 },
  city: { type: String, required: true, maxlength: 50 },
  address: { type: String, required: true, maxlength: 300 },
  zip: { type: String, required: true, maxlength: 10 },
  account_type: { 
    type: String, 
    required: true, 
    maxlength: 50,
    enum: ["store owner", "shopper"] 
  },
  profile_image: { type: Buffer },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true }
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);