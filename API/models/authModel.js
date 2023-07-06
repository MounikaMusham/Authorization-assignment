//Schema for storing user data in mongo db
const mongoose = require('mongoose');

var signUPSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:3,
        max:15

    },
    lastName:{
        type:String,
        required:true,
        min:3,
        max:15
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    },
    profilePhoto:{
        type:String
    }

})

var signUPSchema = mongoose.model("auth",signUPSchema);
module.exports = signUPSchema