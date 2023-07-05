const { string } = require('joi');
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

var SignInSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:15
    }

})

var signUPSchema = mongoose.model("auth",signUPSchema);
// var signInSchema = mongoose.model("signIn",SignInSchema);
module.exports = signUPSchema