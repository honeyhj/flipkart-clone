const User = require("../models/user");
const bcrypt = require('bcrypt');
const shortid = require("shortid");
const jwt = require('jsonwebtoken');


const generateJwtToken = (_id, role) => {
    return jwt.sign({
        _id,
        role
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const userRegistration = async (req, res) => {
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

    await User.findOne({
            email
        })
        .then(async (user) => {
            if (user) {
                res.status(400).json({
                    message: 'user already exists'
                })
            } else {
                await bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            message: 'error occurred'
                        })
                    } else {
                        const info = new User({
                            firstName,
                            lastName,
                            userName: shortid.generate(),
                            email,
                            password: hash,
                            profilePicture,
                            contactNumber,
                        })
                        info.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'user created successfully'
                                })
                            })
                            .catch(error => {
                                res.status(400).json({
                                    message: 'server error occurred'
                                })
                            })
                    }
                })
            }
        })
        .catch(error => {
            res.status(400).json({
                message: 'error occurred'
            })
        })
}

const userLogin = (req, res) => {

    User.findOne({
        email: req.body.email
    }).exec(async (error, user) => {
        if (error) return res.status(400).json({
            error
        });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === "user") {

                // const token = jwt.sign(
                //   { _id: user._id, role: user.role },
                //   process.env.JWT_SECRET,
                //   { expiresIn: "1d" }
                // );
                const token = generateJwtToken(user._id, user.role);
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    },
                });
            } else {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }
        } else {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }
    });

}

const adminLogin = (req, res) => {
    User.findOne({
        email: req.body.email
    }).exec(async (error, user) => {
        if (error) return res.status(400).json({
            error
        });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === "admin") {

                // const token = jwt.sign(
                //   { _id: user._id, role: user.role },
                //   process.env.JWT_SECRET,
                //   { expiresIn: "1d" }
                // );
                const token = generateJwtToken(user._id, user.role);
                const {
                    _id,
                    firstName,
                    lastName,
                    email,
                    role,
                    fullName
                } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    },
                });
            } else {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }
        } else {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }
    });

}


module.exports = {
    userRegistration,
    userLogin,
    adminLogin
}