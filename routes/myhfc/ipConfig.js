//ip config
var ip = '148.100.5.0';
var ipConfig = {
    //org1
    org1_peer_network: 'grpcs://'+ip+':7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org1_event: 'grpcs://'+ip+':7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org2
    org2_peer_network: 'grpcs://'+ip+':8051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org2_event: 'grpcs://'+ip+':8053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org3
    org3_peer_network: 'grpcs://'+ip+':9051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org3_event: 'grpcs://'+ip+':9053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org4
    org4_peer_network: 'grpcs://'+ip+':10051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org4_event: 'grpcs://'+ip+':10053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //order
    orderer_url: 'grpcs://'+ip+':7050'//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
};
module.exports = ipConfig;