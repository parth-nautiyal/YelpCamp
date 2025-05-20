const express = require('express')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware');
const Router = express.Router()
const users = require('../controllers/users')

Router.get('/register', users.registerUserForm)

Router.post('/register',catchAsync( users.signUp))
Router.get('/login', users.loginForm)

Router.post('/login',storeReturnTo, passport.authenticate('local',{failureFlash: true, failureRedirect:'/login'}),users.loggedIn)

Router.get('/logout', users.loggedOut); 

module.exports = Router;