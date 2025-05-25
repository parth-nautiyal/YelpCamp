const express = require('express')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
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
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');


const campgroundRoutes = require('./routes/campground')
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users')

const session = require('express-session');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const dbUrl = process.env.DATABASE_URL;

// Connect to MongoDB Atlas
mongoose.connect(dbUrl)
  .then(() => {
    console.log("MongoDB Atlas connection open");
  })
  .catch(err => {
    console.log("MongoDB connection error", err);
  });


app.engine('ejs', ejsMate);
app.set('query parser', 'extended');
app.set('views', path.join(__dirname, '/views'))
app.use(sanitizeV5({ replaceWith: '_' }));
app.set('views engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))


const secret = process.env.SECRET || 'thisisasecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret
    },
    touchAfter: 24 * 3600 // time period in seconds to limit session updates
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionInfo = {
    store,
    name: 'session', // to avoid default 'connect.sid' cookie name
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true, // enable this when using HTTPS
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionInfo));
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