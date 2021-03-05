const { body, validationResult } = require('express-validator');

exports.authreq = [
    body('firstName').notEmpty().withMessage('fill up the firstName field'),
    body('lastName').notEmpty().withMessage('fill up the lastName field'),
    body('userName').notEmpty().withMessage('fill up the userName field'),
    body('email').notEmpty().withMessage('fill up the email field').isEmail().withMessage('provide a valid email address'),
    body('password').notEmpty().withMessage('fill up the password field').isLength({
        min: 6,
    }).withMessage('password length must be in six'),
    body('contactNumber').notEmpty().withMessage('fill up the contactNumber field'),
]

exports.loginRequest=[
    body('email').notEmpty().withMessage('fill up the email field').isEmail().withMessage('provide a valid email address'),
    body('password').notEmpty().withMessage('fill up the password field').isLength({
        min: 6,
    }).withMessage('password length must be in six'),
]

exports.authValidation = (req, res, next) => {
    const error = validationResult(req);

    if (error.array().length > 0) {
        res.status(400).json({
            error: error.array()[0].msg
        })
    }

    next();

}
