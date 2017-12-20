var express = require('express');
var router = express.Router();
var fs=require('fs');
var multer=require('multer');
/* GET divorce_application listing. */
router.get('/', function(req, res, next) {
    // res.render('marry_query');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('divorce_application');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});

var createFolder=function (folder) {
    try{
        fs.accessSync(folder);
    }catch (e){
        fs.mkdirSync(folder);
    }
};
var uploaderFolder='e:/BIT/divorce_img';
createFolder(uploaderFolder);
var storage=multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null,uploaderFolder);
    },
    filename:function (req, file, cb) {
            req.files;
        var new_name=file.fieldname + '-' + Date.now()+'.jpg';
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null,new_name );
    }
});
var upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'men_img', maxCount: 1 }, { name: 'women_img', maxCount: 1 },{name:'divorce_img',maxCount:1}]);
router.post('/',cpUpload,function (req, res, next) {


    // var file=req.file;
    console.log('文件类型：%s', req.files['men_img'].mimeType);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);

    // var str=file.path;
    // console.log("--------------file.path"+str);
    // var path=str.replace(/\\/g,"\\\\");
    //
    // console.log("------------------path"+path);

    res.render('divorce_application');

});
module.exports = router;
