const {
    userRegistration
} = require('../controllers/userController');
const router = require('express').Router()

router.post('/userRegistration', userRegistration);

module.exports = router;