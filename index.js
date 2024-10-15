const express = require('express')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
    console.log("Connected with Mongoose")
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views',path.join(__dirname,'/views'))
app.set('views engine','ejs')



app.get('/', (req,res)=>{
    res.send("This is YELPCAMP")
})

app.get('/campgrounds',async(req,res)=>{
    const camps = await Campground.find({})
    res.render('home.ejs',{ camps })
})
app.get('/campgrounds/new',(req,res)=>{
    res.render('new.ejs')
})
app.get('/campgrounds/:id',async (req,res)=>{
    const camp = await Campground.findById(req.params.id);
    res.render('show.ejs',{ camp })
})
app.post('/campgrounds',async(req,res)=>{
    const camp = new Campground(req.body.campground)
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})
app.listen(3000, ()=>{
    console.log("App runs at 3000!!!")
})