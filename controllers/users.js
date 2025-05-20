const User = require('../models/user')

module.exports.registerUserForm = (req,res)=>{
    res.render('users/register.ejs')
}
module.exports.signUp = async (req,res, next)=>{
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
}
module.exports.loginForm = (req,res)=>{
    res.render('users/login.ejs')
}
module.exports.loggedIn = (req,res)=>{
    req.flash('success','You are logged in!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    console.log(redirectUrl)
    res.redirect(redirectUrl);
}
module.exports.loggedOut= (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}