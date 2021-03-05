const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    // type: {
    //     type: String,
    // },
    categoryImage: {
        type: String
    },
    parentId: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timeStamp: true
})
const Category = mongoose.model('Category', CategorySchema)
module.exports = Category;