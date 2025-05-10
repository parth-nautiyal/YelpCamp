const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique : true //no two users can have the same email 
    },
    username:{
        type: String,
        required: true
    }
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);