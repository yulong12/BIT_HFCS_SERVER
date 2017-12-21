//ip config
var ipConfig = {
    //org1
    org1_peer_network: 'grpcs://10.4.20.139:7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org1_event: 'grpcs://10.4.20.139:7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org2
    org2_peer_network: 'grpcs://10.4.20.139:8051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org2_event: 'grpcs://10.4.20.139:8053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org3
    org3_peer_network: 'grpcs://10.4.20.139:9051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org3_event: 'grpcs://10.4.20.139:9053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org4
    org4_peer_network: 'grpcs://10.4.20.139:10051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org4_event: 'grpcs://10.4.20.139:10053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //order
    orderer_url: 'grpcs://10.4.20.139:7050'//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
};
module.exports = ipConfig;