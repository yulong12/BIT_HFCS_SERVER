'use strict';

var hfc = require('fabric-client');
var path = require('path');
var util = require('util');
var sdkUtils = require('fabric-client/lib/utils');
var fs = require('fs');
var options = require('./org1Config');

function getKeyFilesInDir(dir) {
//该函数用于找到keystore目录下的私钥文件的路径
    var files = fs.readdirSync(dir);
    var keyFiles = [];
    files.forEach(function (file_name) {
        var filePath = path.join(dir, file_name);
        if (file_name.endsWith('_sk')) {
            keyFiles.push(filePath)
        }
    });
    return keyFiles
}

function postInvokeRequest(requestJson,callback) {
    var channel = {};
    var client = null;
    var targets = [];
    var tx_id = null;
    var str;

    var fcn_request = requestJson;
    Promise.resolve().then(function () {
        console.log("Load privateKey and signedCert");
        client = new hfc();
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
        var data = fs.readFileSync(options.peer_tls_cacerts);
        var peer = client.newPeer(options.peer_url,
            {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': options.server_hostname
            });
//因为启用了TLS，所以上面的代码就是指定Peer的TLS的CA证书
        channel.addPeer(peer);
//接下来连接Orderer的时候也启用了TLS，也是同样的处理方法
        var odata = fs.readFileSync(options.orderer_tls_cacerts);
        var caroots = Buffer.from(odata).toString();
        var orderer = client.newOrderer(options.orderer_url, {
            'pem': caroots,
            'ssl-target-name-override': "orderer.example.com"
        });

        channel.addOrderer(orderer);
        targets.push(peer);
    }).then(function () {
        tx_id = client.newTransactionID();
        console.log("Assigning transaction_id: ", tx_id._transaction_id);
        fcn_request.txId = tx_id;
        fcn_request.targets = targets;
        return channel.sendTransactionProposal(fcn_request);
    }).then(function (results) {
        var proposalResponses = results[0];
        var proposal = results[1];
        var header = results[2];
        var isProposalGood = false;
        if (proposalResponses && proposalResponses[0].response &&
            proposalResponses[0].response.status === 200) {
            isProposalGood = true;
            console.log('transaction proposal was good');
        } else {
            console.error('transaction proposal was bad');
            str = "不符合条件";
        }
        if (isProposalGood) {
            console.log(util.format(
                'Successfully sent Proposal and received ProposalResponse: Status - %s, message - "%s", metadata - "%s", endorsement signature: %s',
                proposalResponses[0].response.status, proposalResponses[0].response.message,
                proposalResponses[0].response.payload, proposalResponses[0].endorsement.signature));
                str = JSON.parse(proposalResponses[0].response.payload.toString());

            var request = {
                proposalResponses: proposalResponses,
                proposal: proposal,
                header: header
            };
            // set the transaction listener and set a timeout of 30sec
            // if the transaction did not get committed within the timeout period,
            // fail the test
            var transactionID = tx_id.getTransactionID();
            var eventPromises = [];
            var eh = client.newEventHub();
            //接下来设置EventHub，用于监听Transaction是否成功写入，这里也是启用了TLS
            var data = fs.readFileSync(options.peer_tls_cacerts);
            var grpcOpts = {
                pem: Buffer.from(data).toString(),
                'ssl-target-name-override': options.server_hostname
            };
            eh.setPeerAddr(options.event_url, grpcOpts);
            eh.connect();

            var txPromise = new Promise(function (resolve, reject) {
                var handle = setTimeout(function () {
                    eh.disconnect();
                    reject();
                }, 30000);
//向EventHub注册事件的处理办法
                eh.registerTxEvent(transactionID, function (tx, code) {
                    clearTimeout(handle);
                    eh.unregisterTxEvent(transactionID);
                    eh.disconnect();

                    if (code !== 'VALID') {
                        console.error(
                            'The transaction was invalid, code = ' + code);
                        reject();
                    } else {
                        console.log(
                            'The transaction has been committed on peer ' +
                            eh._ep._endpoint.addr);
                        resolve();
                    }
                });
            });
            eventPromises.push(txPromise);
            var sendPromise = channel.sendTransaction(request);
            return Promise.all([sendPromise].concat(eventPromises)).then(function (results) {
                console.log(' event promise all complete and testing complete');
                return results[0]; // the first returned value is from the 'sendPromise' which is from the 'sendTransaction()' call
            }).catch(function (err) {
                console.error(
                    'Failed to send transaction and get notifications within the timeout period.'
                );
                return 'Failed to send transaction and get notifications within the timeout period.';
            });
        } else {
            console.error(
                'Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...'
            );
            return 'Failed to send Proposal or receive valid response. Response null or status is not 200. exiting...';
        }
    }, function (err) {
        console.error('Failed to send proposal due to error: ' + err.stack ? err.stack :
            err);
        return 'Failed to send proposal due to error: ' + err.stack ? err.stack :
            err;
    }).then(function (response) {
        if (response.status === 'SUCCESS') {
            console.log('Successfully sent transaction to the orderer.');
            return tx_id.getTransactionID();
        } else {
            console.error('Failed to order the transaction. Error code: ' + response.status);
            return 'Failed to order the transaction. Error code: ' + response.status;
        }
    }, function (err) {
        console.error('Failed to send transaction due to error: ' + err.stack ? err
            .stack : err);
        return 'Failed to send transaction due to error: ' + err.stack ? err.stack :
            err;
    }).then(function (value) {
        if (callback && typeof(callback) === "function") {
            callback(str);
        }
    },function (err) {
        console.error('Failed to send proposal due to error: ' + err.stack ? err.stack :
            err);
        return 'Failed to send proposal due to error: ' + err.stack ? err.stack :
            err;
    }).catch(function (err) {
        console.error("Caught Error", err);
    });
}

module.exports = postInvokeRequest;