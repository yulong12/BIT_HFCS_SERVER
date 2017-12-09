var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});
router.post('/',function (req, res, next) {
    var name=req.body.login_name;
    var password=req.body.login_password;
    var mysql=require("../db/MYSQLconnection");
    var query="SELECT * FROM login_user WHERE name="+" '"+name+"';";
    console.log(query);
   mysql.executeQuery(query,function (status,result) {

       if (status==="OK"){
           if (result.rows.length===0){
               res.send("no");
           }
           else if ((result.rows[0].name===name)&&(result.rows[0].password===password)){
               console.log(result);
               res.send("ok");

           }
       }else {
           console.log("-------------------")
       }
   });

});
module.exports = router;
