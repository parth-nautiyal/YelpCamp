const express = require('express')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const Router = express.Router()

Router.get('/register', (req,res)=>{
    res.render('users/register.ejs')
})
Router.post('/register',catchAsync(async (req,res)=>{
    try{
    const {username, email, password} = req.body
    const user = new User({email, username})
    const registeredUser = await User.register(user, password)
    console.log(registeredUser)
    req.flash('success', 'Welcome to YelpCamp!')
    res.redirect('/campgrounds')
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
}))
Router.get('/login', (req,res)=>{
    res.render('users/login.ejs')
})
Router.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','You are logged in!')
    res.redirect('/campgrounds')
})
module.exports = Router;