const User = require("../models/user");
const bcrypt = require('bcrypt');
const shortid = require("shortid");

const adminRegistration =async (req,res)=>{
    const {
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
        profilePicture,
        contactNumber,
    } = req.body;
    
   await User.findOne({ email})
    .then(async(user) =>{
        if(user){
            res.status(400).json({ message:'user already exists'})
        }
        else{
           await bcrypt.hash(password,10,(err,hash)=>{
                if(err){
                    res.status(500).json({ message:'error occurred'})
                }
                else{
                    const info = new User({
                        firstName,
                        lastName,
                        userName:shortid.generate(),
                        email,
                        role:'admin',
                        password:hash,
                        confirmPassword,
                        profilePicture,
                        contactNumber,
                    })
                    info.save()
                    .then(user=>{
                        res.status(201).json({ message:'admin created successfully'})
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
        adminRegistration,
    }