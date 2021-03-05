const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
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

UserSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
  });

UserSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.password);
    },
  };

const User = mongoose.model('User',UserSchema)
module.exports = User;