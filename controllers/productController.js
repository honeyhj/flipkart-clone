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
            return {
                img: file.filename
            };
        });
    }
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
const  getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(200).json({ product });
        }
    });
    } else {
        return res.status(400).json({ error: "Params required" });
    }
};
const deleteProductById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.deleteOne({ _id: productId })
        .exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
            res.status(202).json({ result });
        }
    });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};
module.exports = {
    createProduct,
    getProductDetailsById,
    deleteProductById,
}