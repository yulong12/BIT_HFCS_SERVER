'use strict';
//org1 is police
var hfc = require('fabric-client');
var path = require('path');
var sdkUtils = require('fabric-client/lib/utils');
var fs = require('fs');
var options = require('./org1Config');

var channel = {};
var client = null;
var request = {};
var str = {};

function getKeyFilesInDir(dir) {
    var files = fs.readdirSync(dir);
    var keyFiles = [];
    files.forEach(function (file_name) {
        var filePath = path.join(dir,file_name);
        if (file_name.endsWith('_sk')) {
            keyFiles.push(filePath)
        }
    });
    return keyFiles
}

function postRequest(requestJson, callback) {
    request = requestJson;
    Promise.resolve().then(function () {
        console.log("Load privateKey and signedCert");
        client = new hfc();
        console.log("--------no find----------------");
        var createUserOpt = {
            username: options.user_id,
            mspid: options.msp_id,
            cryptoContent: {
                privateKey: getKeyFilesInDir(options.privateKeyFolder)[0],
                signedCert: options.signedCert
            }
        };
        //以上代码指定了当前用户的私钥，证书等基本信息
        return sdkUtils.newKeyValueStore({
            path: "/tmp/fabric-client-stateStore/"
        }).then(function (store) {
            client.setStateStore(store);
            return client.createUser(createUserOpt);
        })
    }).then(function (user) {
        channel = client.newChannel(options.channel_id);

        var data = fs.readFileSync(options.tls_cacerts);
        var peer = client.newPeer(options.network_url,
            {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': options.server_hostname
            }
        );
        peer.setName("peer0");
        //因为启用了TLS，所以上面的代码就是指定TLS的CA证书
        channel.addPeer(peer);
    }).then(function () {
        console.log("Make query");
        var transaction_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", transaction_id._transaction_id);
        //构造查询request参数
        // request = {
        //     chaincodeId: options.chaincode_id,
        //     txId: transaction_id,
        //     fcn: 'queryID',
        //     args: ['110105199409026676']
        // };
        request.txid = transaction_id;
        return channel.queryByChaincode(request);
    }).then(function (query_responses) {
        console.log("returned from query");
        if (!query_responses.length) {
            console.log("No payloads were returned from query");
        } else {
            console.log("Query result count = ", query_responses.length)
        }
        if (query_responses[0] instanceof Error) {
            console.error("error from query = ", query_responses[0]);
        }
        console.log("Response from blockchain is ", query_responses[0].toString());//打印返回的结果
        str = JSON.parse(query_responses[0].toString());
    }).then(function (value) {
        if (callback && typeof(callback) === "function") {
            callback(str);
        }
    }).catch(function (err) {
        console.error("Caught Error", err);
    });

}


module.exports = postRequest;
// module.exports = router;
