const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating: Number,
    reviewText: String
})

module.exports = mongoose.model('Review', ReviewSchema);