//ip config
var ipConfig = {
    //org1
    org1_peer_network: 'grpcs://peer0-org1.fabric-net:7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org1_event: 'grpcs://peer0-org1.fabric-net:7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org2
    org2_peer_network: 'grpcs://peer0-org2.fabric-net:7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org2_event: 'grpcs://peer0-org2.fabric-net:7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org3
    org3_peer_network: 'grpcs://peer0-org3.fabric-net:7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org3_event: 'grpcs://peer0-org3.fabric-net:7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //org4
    org4_peer_network: 'grpcs://peer0-org4.fabric-net:7051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    org4_event: 'grpcs://peer0-org4.fabric-net:7053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    //order
    orderer_url: 'grpcs://orderer.fabric-net:7050'//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
};
module.exports = ipConfig;
