const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        // required:true,
        minlength:3,
    },
    lastName:{
        type:String,
        trim:true,
        // required:true,
        minlength:3,
    },
    userName:{
        type:String,
        trim:true,
        // required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        // required:true,
        unique:true
    },
    password:{
        type:String,
        // required:true,
    },
    profilePicture:{
        type:String,
    },
    role:{
        type:String,
        enum:['user','admin','superAdmin'],
        default:'user'
    },
    contactNumber:{
        type:String,
    },
},{timeStamp:true})
const User = mongoose.model('User',UserSchema)
module.exports = User;