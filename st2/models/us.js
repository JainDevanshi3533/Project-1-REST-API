const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college:{
        type:String
    },
    hobbies:[{
        type:String
    }],
    address:{
        city:String,
        state:String,
        country:String
    }
    
})

module.exports = mongoose.model('User',userSchema)