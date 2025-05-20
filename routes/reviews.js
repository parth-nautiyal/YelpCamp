const express = require('express')
const Router = express.Router({mergeParams: true}) // very important, as the router has seperate param, so we need :id from the path in /campgrounds/:id/reviews
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, validateReviews, isReviewAuthor} = require('../middleware')
const reviews = require('../controllers/reviews')

Router.post('/', isLoggedIn, validateReviews, catchAsync(reviews.createReview))

Router.delete('/:reviewId', isLoggedIn,isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = Router