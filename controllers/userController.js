const User = require("../models/user");
const bcrypt = require('bcrypt');
const shortid = require("shortid");

const userRegistration = (req,res)=>{
    const {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
        profilePicture,
        role,
        contactNumber,
    } = req.body;
    User.findOne({ email})
    .then(user =>{
        if(user){
            res.status(400).json({ message:'user already exists'})
        }
        else{
            bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({ message:'error occurred'})
                }
                else{
                    const info = new User({
                        firstName,
                        lastName,
                        userName:shortid.generate(),
                        email,
                        password:hash,
                        profilePicture,
                        role,
                        contactNumber,
                    })
                    info.save()
                    .then(user=>{
                        res.status(201).json({ message:'user created successfully'})
                    })
                    .catch(error =>{
                        res.status(400).json({ message:'server error occurred'})
                    })
                }
            })
        }
    })
    .catch(error =>{
        res.status(400).json({ message:'error occurred'})
    })
    }
    module.exports = {
        userRegistration,
    }