const express = require('express')
const Router = express.Router({mergeParams: true}) // very important, as the router has seperate param, so we need :id from the path in /campgrounds/:id/reviews
const Campground = require('../models/campground')
const Review = require('../models/reviews')
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, validateReviews} = require('../middleware')

Router.post('/', isLoggedIn, validateReviews, catchAsync(async (req, res) => { 
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