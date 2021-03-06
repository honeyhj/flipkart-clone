const Category = require("../models/category");
// var slugify = require('slugify');
const shortid = require("shortid");

const addCategory = (req,res) => {
    console.log(req.file);
    
    const {
    name,
    // type,
    // categoryImage,
    // parentId,
    } = req.body;
    const category = new Category({
        name,
        // slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        // type,
        // categoryImage,
        // parentId,
        // createdBy:req.user._id,
    })
    // category.save()

}

module.exports = {
    addCategory,
}