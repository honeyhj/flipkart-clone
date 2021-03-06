// const product = require("../models/product");

const { default: slugify } = require("slugify");
const Product = require("../models/product");

const createProduct = async(req, res) => {
    const {
        name,
        price,
        description,
        category,
        quantity,
        createdBy
    } = req.body;

    let productPictures = [];
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            console.log(file,'filee');
            
            return {
                img: file.filename
            };
        });
    }
console.log(productPictures);

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
    });
    await product.save((error, product) => {
        if (error) return res.status(400).json({
            error
        });
        if (product) {
            res.status(201).json({
                product,
                files: req.files
            });
        }
    });
}
module.exports = {
    createProduct,
}