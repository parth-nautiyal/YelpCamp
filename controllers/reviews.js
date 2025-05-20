const Campground = require('../models/campground')
const Review = require('../models/reviews')

module.exports.createReview = async (req, res) => { 
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.review.push(review);
    await review.save();
    await camp.save();
    console.log(review)
    req.flash('success','Review succesfully added')
    res.redirect(`/campgrounds/${camp._id}`)
}
module.exports.deleteReview = async (req,res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate( id, { $pull: { review: reviewId } });// deleting the review from the campground
    await Review.findByIdAndDelete(reviewId);// deleting the review from the review collection
    req.flash('success','Review successfully deleted')
    res.redirect(`/campgrounds/${id}`)
}