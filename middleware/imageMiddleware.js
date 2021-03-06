var multer=require('multer');
var path=require('path');
const shortid = require("shortid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
  var upload = multer({ storage: storage })

module.exports=upload;