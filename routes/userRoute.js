const {
    userRegistration, userLogin,userLogOut
} = require('../controllers/userController');

const { authreq, authValidation, loginRequest } = require('../validator/authValidator');
const router = require('express').Router()



router.post('/userRegistration',authreq,authValidation, userRegistration);
router.post('/userLogin',loginRequest,authValidation, userLogin);
router.post('/userLogout', userLogOut);

module.exports = router;