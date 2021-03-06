const Category = require("../models/category");
var slugify = require('slugify');

function createCategories (categories,parentId = null){
    let categoryList=[]
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined)
    }else{
        category = categories.filter(cat => cat.parentId == parentId)
    }
    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            type: cat.type,
            children: createCategories(categories, cat._id),
        })
    }
    return categoryList;
}

const addCategory = (req,res) => {
    const  categoryObj = {
        name:req.body.name,
        slug:slugify(req.body.name),
        createdBy:req.user._id
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const info = new Category(categoryObj)
    info.save((error, category)=>{
        if(error){
            return res.status(400).json(error)
        }
        if(category){
            return res.status(201).json(category)
        }
    })
}
const getCategories = async(req, res)=>{
    await Category.find({})
    .then(categories =>{
        if(categories){
            const categoryList = createCategories(categories)
            return res.status(200).json({categoryList})
        }
    })
    .catch(error=>{
        if(error){
            return res.status(400).json({error})
        }
    })
    // .exec((error,categories)=>{
    //     if(error){
    //         return res.status(400).json({error})
    //     }
    //     if(categories){
    //         const categoryList = createCategories(categories)
    //         return res.status(200).json({categoryList})
    //     }
    // })
}
module.exports = {
    addCategory,
    getCategories,
}