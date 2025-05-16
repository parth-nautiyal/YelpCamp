const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate');
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError');
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const user = require('./models/user')

const campgroundRoutes = require('./routes/campground')
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users')

const session = require('express-session');


mongoose.connect('mongodb://localhost:27017/yelpcamp')
  .then(() => {
    console.log("MongoDB connection open");
  })
  .catch(err => {
    console.log("MongoDB connection error", err);
  });



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

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()))

passport.serializeUser(user.serializeUser()) // how we store the user in the session
passport.deserializeUser(user.deserializeUser())// how we get the user out of the session or Defines how to get the full user object back from the session data.

app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error=req.flash('error')
    next();
})

app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/',userRoutes)


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
app.listen(3000, () => {
    console.log("App runs at 3000!!!")
})