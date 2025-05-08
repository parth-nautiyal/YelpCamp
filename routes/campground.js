const express = require('express')
const Campground = require('../models/campground')
const {campgroundSchema} = require('../schema')
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError');
const Router = express.Router()

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}

Router.get('/', catchAsync(async (req, res) => {
    const camps = await Campground.find({})
    res.render('home.ejs', { camps })
}))
Router.get('/new', (req, res) => {
    res.render('new.ejs')
})
Router.get('/:id', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate('review');
    if(!camp)
    {
        req.flash('error','Campground does not exists')
        return res.redirect('/campgrounds')
    }
    res.render('show.ejs', { camp })
}))
Router.get('/:id/edit', catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    if(!camp)
        {
            req.flash('error','Campground not found')
            return res.redirect('/campgrounds');
        }
    res.render('edit.ejs', { camp })
}))
Router.patch('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success','Successfully updated Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}))
Router.post('/', validateCampground, catchAsync(async (req, res) => {
    const camp = new Campground(req.body.campground)
    await camp.save()
    req.flash('success','Successfully made a new Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}))
Router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted Campground')
    res.redirect('/campgrounds');
}))

module.exports = Router