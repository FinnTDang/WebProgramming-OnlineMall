const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  contact_purpose: { type: String, enum: [ "Business inquiry", "Event hosting", "Other" ] },
  contact_name: { type: String },
  contact_email: { type: String },
  contact_phone: { type: String },
  contact_preference: { type: String, enum: [ "phone", "email" ] },
  contact_day: [{ type: String }],
  message: { type: String }
});

// Export model
module.exports = mongoose.model("Contact", ContactSchema);