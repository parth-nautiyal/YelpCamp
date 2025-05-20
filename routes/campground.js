const express = require('express')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const Router = express.Router()
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const campgrounds = require('../controllers/campgrounds')

Router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.renderCampForm)) 

Router.get('/new', isLoggedIn, campgrounds.newCampForm)

Router.route('/:id')
    .get(catchAsync(campgrounds.viewCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))
    .patch(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCamp))
                    
Router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp))

module.exports = Router