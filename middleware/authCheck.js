const jwt = require("jsonwebtoken");

exports.signInCheck=(req,res,next)=>{
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
exports.userCheck = (req, res, next)=>{
    if(req.user.role !== 'user'){
        return res.status(400).json({
            message:'you are not allowed'
        })
    }
    next()
}
exports.adminCheck = (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({
            message:'you are not allowed'
        })
    }
    next()
}