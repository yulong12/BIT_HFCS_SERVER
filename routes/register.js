var express = require('express');
var router = express.Router();
var options = require('./myhfc/org1Config');

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
    var child_name = req.body.child_name;
    console.log(typeof(parent_id));
    var request = {
        chaincodeId: options.chaincode_id,
        fcn: 'createCheck',
        args: [parent_id, "1", child_name],
        chainId: options.channel_id
    }
    var createHuman =  require('./myhfc/myhfcInvoke');

    createHuman(request, function (str) {
        console.log(str);
    });
});

module.exports = router;
