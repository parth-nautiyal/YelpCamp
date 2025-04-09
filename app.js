const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate');
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError');

const campgrounds = require('./routes/campground')
const reviews = require('./routes/reviews')


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