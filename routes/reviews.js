const express = require('express')
const Router = express.Router({mergeParams: true}) // very important, as the router has seperate param, so we need :id from the path in /campgrounds/:id/reviews
const Campground = require('../models/campground')
const Review = require('../models/reviews')
const ExpressError = require('../utils/ExpressError');
const {reviewSchema} = require('../schema')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn} = require('../middleware')

const validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}
Router.post('/', validateReviews, catchAsync(async (req, res) => { 
    console.log(req.params)
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    camp.review.push(review);
    await review.save();
    await camp.save();
    req.flash('success','Review succesfully added')
    res.redirect(`/campgrounds/${camp._id}`)
}))
Router.delete('/:reviewId', isLoggedIn,catchAsync(async (req,res)=>{
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate( id, { $pull: { review: reviewId } });// deleting the review from the campground
    await Review.findByIdAndDelete(reviewId);// deleting the review from the review collection
    req.flash('success','Review successfully deleted')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = Router