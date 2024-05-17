const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
    fee_type: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true }
});

module.exports = mongoose.model('Fee', FeeSchema);
