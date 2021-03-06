const route = require('express').Router()
const {addCategory} = require('../controllers/categoryController');
const upload = require('../middleware/imageMiddleware');

route.post('/addCategory',upload.single("categoryImage"), addCategory)

module.exports = route;