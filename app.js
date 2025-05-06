const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate');
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash')

const campgrounds = require('./routes/campground')
const reviews = require('./routes/reviews');
const session = require('express-session');


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
    console.log("Connected with Mongoose")
}

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, '/views'))
app.set('views engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

const sessionInfo = {
    secret: 'thisisasceret',  // used to sign the session ID cookie (so it can’t be tampered)
    resave: false,            // don’t save session if nothing is modified
    saveUninitialized: true,  // save new sessions
    cookie: {
        httpOnly: true,       // prevent JavaScript from accessing the cookie (protects against XSS)
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // set expiration date (1 week)
        maxAge: 1000 * 60 * 60 * 24 * 7                // max age of the cookie
    }
}

app.use(session(sessionInfo))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    next();
})

app.use('/campgrounds',campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.get('/', (req, res) => {
    res.send("This is YELPCAMP")
})

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, 'Page Not Found'))
})
app.use((err, req, res,next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went wrong"
    res.status(statusCode).render('error.ejs', { err })
})
app.listen(3001, () => {
    console.log("App runs at 3001!!!")
})