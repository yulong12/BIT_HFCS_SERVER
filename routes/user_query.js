var express = require('express');
var router = express.Router();

/* GET userquery listing. */
router.get('/', function (req, res, next) {
    // res.render('user_query');
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        console.log('----------------------' + name);
        res.render('user_query')
    } else {
        res.send('你还没有登录，先登录下试试！');
    }
});

router.post('/', function (req, res, next) {

    var options = require('./myhfc/config');
    var select_id = req.body.select_id;

    var request;
    request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
    };

    var myhfcQuery = require('./myhfc/myhfcQuery');


    myhfcQuery(request, function (str) {
        res.send(JSON.stringify(str));
    });

    //setTimeout(function(){console.log("-------wait-----");console.log(JSON.stringify(str))},3000);

    //res.send("not ok");

});

module.exports = router;
