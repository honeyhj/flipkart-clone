const jwt = require("jsonwebtoken");

exports.userSignInCheck=(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token,process.env.JWT_SECRET)
        req.user = user;
    }else{
        return res.status(400).json({
            message:'authorization required'
        })
    }
    next();
}
exports.userSignInCheck = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    next();
};
exports.userCheck = (req, res, next)=>{
    if(req.body.role !== 'user'){
        return res.status(400).json({
            message:'you are not allowed'
        })
    }
    next()
}
exports.adminCheck = (req, res, next)=>{
    if(req.body.role !== 'admin'){
        return res.status(400).json({
            message:'you are not allowed'
        })
    }
    next()
}