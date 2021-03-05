const {
    adminRegistration
} = require('../admin/adminController');
const { adminLogin } = require('../controllers/userController');

const { authreq, authValidation, loginRequest } = require('../validator/authValidator');
const router = require('express').Router()

router.post('/adminRegistration',authreq,authValidation, adminRegistration);
router.post('/adminLogin',loginRequest,authValidation, adminLogin);

module.exports = router;