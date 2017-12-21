var express = require('express');
var router = express.Router();
var mysql=require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;

    var array=["marry_check","marry_check"];
    var i = 0;
    var data=[];

      // array.forEach(function (table) {
      //     var select="select * from "+table+" where if_managed=1 and if_look=1;";
      //
      //     mysql.executeQuery(select,function (status, result) {
      //         console.log("============="+result.rows[0]);
      //         var if_managed= result.rows[0].if_managed;
      //         var if_look=result.rows[0].if_look;
      //         console.log(typeof(if_managed));
      //
      //         if((if_managed===1)&&(if_look===1)) {
      //             console.log('push===========');
      //             console.log(table);
      //             data.push(table);
      //         }
      //     });
      //     i++;
      //     if (i === array.length){
      //       console.log(data);
      //       res.render('user', {comment: data[0]});
      //     }
      //
      // });
      // for (var i=0; i<array.length; i++) {
      //   var table = array
      //     var select = "select * from " + array[i] + " where if_managed=1 and if_look=1;";
      //     console.log("=============" + select);
      //     mysql.executeQuery(select, function (status, result) {
      //         console.log("=============" + result.rows[0]);
      //         var if_managed = result.rows[0].if_managed;
      //         var if_look = result.rows[0].if_look;
      //         console.log(typeof(if_managed));
      //
      //         if ((if_managed === 1) && (if_look === 1)) {
      //             console.log('push===========');
      //             console.log(array[i]);
      //             data.push(array[i]);
      //         }
      //
      //     });
      //     if (i === array.length-1){
      //       console.log(data);
      //       res.render('user', {comment: data[0]});
      //     }
      // }
      res.render('user');
  } else {
    res.render('need_login');
  }
});

module.exports = router;
