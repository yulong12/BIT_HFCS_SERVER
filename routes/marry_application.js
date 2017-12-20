var express = require('express');
var router = express.Router();
var fs=require('fs');
var multer=require('multer');
var mysql=require("../db/MYSQLconnection");

/* GET marryquery listing. */
router.get('/', function(req, res, next) {
    // res.render('marry_query');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('marry_application');
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
var uploaderFolder='e:/BIT/marry_img';
createFolder(uploaderFolder);
var storage=multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null,uploaderFolder);
    },
    filename:function (req, file, cb) {
        var new_name=file.fieldname + '-' + Date.now()+'.jpg';
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null,new_name );
    }
});
var upload = multer({ storage: storage });


router.post('/',upload.single("marry_img"),function (req, res, next) {

    var men_id= req.body.men_id;
    var women_id=req.body.women_id;
    var marry_date=req.body.marry_date;

    var file=req.file;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);

    var str=file.path;
    console.log("--------------file.path"+str);
    var path=str.replace(/\\/g,"\\\\");

    console.log("------------------path"+path);
   // var query="insert into per_img (per_id,img_size,path) values ("+"'1111111111'"+",'"+file.size+"','"+path+"');";
    var query="insert into marry_application(men_id,women_id,per_img_path,per_img_hash,is_manage)values('"+men_id+"','"+women_id+"','"+path+"','"+"per_img_hash"+"',"+"1);";
    console.log("-------------"+query);
    mysql.executeQuery(query,function (status,result) {

    });
    res.render('marry_application');

});
module.exports = router;
