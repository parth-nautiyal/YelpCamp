const express = require('express')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const Router = express.Router()
const users = require('../controllers/users')

Router.route('/register')
    .get(users.registerUserForm)
    .post(catchAsync( users.signUp))

Router.route('/login')
    .get(users.loginForm)
    .post(storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),users.loggedIn)

Router.get('/logout', users.loggedOut); 

module.exports = Router;