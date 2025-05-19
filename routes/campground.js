const express = require('express')
const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync')
const Router = express.Router()
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')


Router.get('/', catchAsync(async (req, res) => {
    const camps = await Campground.find({})
    res.render('campgrounds/home.ejs', { camps })
}))
Router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new.ejs')
})
Router.get('/:id',catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate(
        {
            path:'review',
            populate:{
                path: 'author'
            }
        }
    ).populate('author');
    console.log(camp)
    if(!camp)
    {
        req.flash('error','Campground does not exists')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show.ejs', { camp })
}))
Router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const camp = await Campground.findById(req.params.id)
    if(!camp)
        {
            req.flash('error','Campground not found')
            return res.redirect('/campgrounds');
        }
    res.render('campgrounds/edit.ejs', { camp })
}))
Router.patch('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success','Successfully updated Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}))
Router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    const camp = new Campground(req.body.campground)
    camp.author = req.user._id;
    await camp.save()
    req.flash('success','Successfully made a new Campground')
    res.redirect(`/campgrounds/${camp._id}`)
}))
Router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully deleted Campground')
    res.redirect('/campgrounds');
}))

module.exports = Router