'use strict';
var express = require('express');
var router = express.Router();

/* GET childregister listing. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        console.log('----------------------'+name);
        res.render('child_register')

    }else {
        res.send('你还没有登录，先登录下试试！');
    }
    // res.render('child_register');
});

//post
router.post('/',function (req, res, next) {

    //get req.information
    var child__name = req.body.child__name;
    var child_weight = req.body.child_weight;
    var child_sex = req.body.child_sex;
    var child_date = req.body.child_date;
    var child_place = req.body.child_place;
    var mother_name = req.body.mother_name;
    var mother_age = req.body.mother_age;
    var mother_ID = req.body.mother_ID;
    var father_name = req.body.father_name;
    var father_age = req.body.father_age;
    var father_ID = req.body.father_ID;
    var health = req.body.health;
    var hospital = req.body.hospital;
    var request = {
        //targets: targets,
        chaincodeId: options.chaincode_id,
        fcn: 'createBirth',
        args: [father_ID, mother_ID, child_sex,child_date,hospital],
        chainId: options.channel_id,
        //txId: tx_id
    };
    // var creat_birth = require('/myhfc/myhfcInvoke');
    // creat_birth.postInvokeRequest(request);
    res.send("ok");


});

module.exports = router;
