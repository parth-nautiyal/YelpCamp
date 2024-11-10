const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')

main().catch(err =>console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/yelpcamp');
}

const sample = array => array[Math.floor(Math.random()*array.length)]

const seedDB = async () =>{
    await Campground.deleteMany({})
    // feeding 50 cities camps in Database at different locations
    for( let i=0;i<50;i++)
    {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+10;
        const camp = new Campground({
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic vero laboriosam quo praesentium recusandae? Corporis quas deserunt molestiae illo vitae ipsam sapiente nobis ad suscipit soluta itaque ut, eveniet rem!',
            price
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})