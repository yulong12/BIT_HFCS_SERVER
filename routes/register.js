var express = require('express');
var router = express.Router();
var options = require('./myhfc/config')

/* GET register page. */
router.get('/', function(req, res, next) {
    // res.render('register');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('register');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});
router.post('/',function(req,res,next){
    var parent_id = req.body.parent_id;
    var child_birth = req.body.child_birth;
    var child_name = req.body.child__name;
    console.log("---------got info---------");
    var request = {
        chaincodeId: options.chaincode_id,
        fcn: 'createHuman',
        args: [parent_id, "1", child_name],
        chainId: options.channel_id
    }
    console.log("------------set req---------");
    var creatHuman = rquire('./myhfc/myhfcInvoke');
    console.log("------------require myhcfInvoke------");
    creatHuman(request);
    console.log("-----------execute myhfcInvoke--------");
    res.send("ok");
    console.log("------------res send------------------");
});

module.exports = router;
