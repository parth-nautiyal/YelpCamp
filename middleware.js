const ExpressError = require('./utils/ExpressError');
const {campgroundSchema} = require('./schema')
const Campground = require('./models/campground')
const {reviewSchema} = require('./schema')
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.isAuthor = async(req, res ,next)=>{
    const {id} = req.params;
    const camp = await Campground.findById(id)
    if(!camp.author.equals(req.user._id))
    {
        req.flash('error', 'You are not the Author')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}
module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}
module.exports.validateReviews = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(400, msg)
    }
    else {
        next();
    }
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}