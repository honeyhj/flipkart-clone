const { body, validationResult } = require('express-validator');

exports.authValidation = (req,res)=>{
    [
        body('firstName').notEmpty().withMessage('fill up the firstName field'),
        body('lastName').notEmpty().withMessage('fill up the lastName field'),
        body('userName').notEmpty().withMessage('fill up the userName field'),
        body('email').notEmpty().withMessage('fill up the email field').isEmail().withMessage('provide a valid email address'),
        body('password').notEmpty().withMessage('fill up the password field').isLength({
            min:6,
        }).withMessage('password length must be in six'),
        body('contactNumber').notEmpty().withMessage('fill up the contactNumber field'),
    ]
}
        firstName,
        lastName,
        userName,
        email,
        password,
        confirmPassword,
        profilePicture,
        role,
        contactNumber,