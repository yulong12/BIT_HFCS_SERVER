var mysql = require('mysql');
var config = require("./DBConfig");

var pool  = mysql.createPool(config);

exports.executeQuery=function(query,callback){
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            callback("ERR", {detail: err});
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(query, function(err,rows){

            if(!err) {
                callback("OK", {rows: rows});
            } else {
                callback("ERR", {detail: err})
            }
            connection.release();
        });

        connection.on('error', function(err) {
            callback("ERR", {detail: err});
        });
    });
};