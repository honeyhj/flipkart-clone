const route = require('express').Router()
const {addCategory} = require('../controllers/categoryController');
const { signInCheck, adminCheck } = require('../middleware/authCheck');
const upload = require('../middleware/imageMiddleware');
const {getCategories} = require('../controllers/categoryController');

route.post('/addCategory',signInCheck,adminCheck,upload.single("categoryImage"), addCategory)
route.get('/getCategories', getCategories)

module.exports = route;