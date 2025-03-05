const mongoose = require('mongoose');
const { campgroundSchema } = require('../schema');
const Review = require('./reviews');
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})
 CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.review
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);
