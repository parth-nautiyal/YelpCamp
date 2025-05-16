const express = require('express')
const User = require('../models/user')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const Router = express.Router()

Router.get('/register', (req,res)=>{
    res.render('users/register.ejs')
})
Router.post('/register',catchAsync(async (req,res, next)=>{
    try{
    const {username, email, password} = req.body
    const user = new User({email, username})
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err =>{
        if(err) return next(err)
        else{
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds')
        }
    })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
}))
Router.get('/login', (req,res)=>{
    res.render('users/login.ejs')
})
Router.post('/login',storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),(req,res)=>{
    req.flash('success','You are logged in!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    console.log(redirectUrl)
    res.redirect(redirectUrl);
})
Router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}); 
module.exports = Router;