const express = require('express')
const mongoose = require('mongoose')
const Campground = require('./models/campground')
const bodyParser = require('body-parser')
const ejsMate = require('ejs-mate');
const app = express()
const path = require('path')
const methodOverride=require('method-override')



main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
    console.log("Connected with Mongoose")
}

app.engine('ejs', ejsMate);
app.set('views',path.join(__dirname,'/views'))
app.set('views engine','ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


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
app.get('/campgrounds/:id/edit', async(req,res) =>{
    const camp = await Campground.findById(req.params.id)
    res.render('edit.ejs', { camp })
})
app.patch('/campgrounds/:id', async(req,res) =>{
    const {id} = req.params;
    const camp = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${camp._id}`)
})
app.post('/campgrounds',async(req,res)=>{
    const camp = new Campground(req.body.campground)
    await camp.save()
    res.redirect(`/campgrounds/${camp._id}`)
})
app.delete('/campgrounds/:id', async(req,res) =>{
    const {id} = req.params
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})
app.listen(3000, ()=>{
    console.log("App runs at 3000!!!")
})