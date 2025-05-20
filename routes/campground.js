const express = require('express')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const Router = express.Router()
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const campgrounds = require('../controllers/campgrounds')


Router.get('/', catchAsync(campgrounds.index))

Router.get('/new', isLoggedIn, campgrounds.newCampForm)

Router.get('/:id',catchAsync(campgrounds.viewCamp))

Router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp))

Router.patch('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCamp))

Router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.renderCampForm))

Router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp))

module.exports = Router