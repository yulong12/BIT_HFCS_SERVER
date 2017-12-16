//Labor and Social Security Bureau
var config = {
    user_id: 'Admin@org4.example.com',
    msp_id: 'Org4MSP',
    channel_id: 'mychannel',
    chaincode_id: 'mycc',
    peer_url: 'grpcs://10.4.20.139:10051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    event_url: 'grpcs://10.4.20.139:10053',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    orderer_url: 'grpcs://10.4.20.139:7050',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    network_url: 'grpcs://10.4.20.139:10051',//因为启用了TLS，所以是grpcs,如果没有启用TLS，那么就是grpc
    privateKeyFolder:'../crypto-config/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp/keystore',
    signedCert: '../crypto-config/peerOrganizations/org4.example.com/users/Admin@org4.example.com/msp/signcerts/Admin@org4.example.com-cert.pem',
    tls_cacerts: '../crypto-config/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt',
    peer_tls_cacerts: '../crypto-config/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt',
    orderer_tls_cacerts: '../crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/tls/ca.crt',
    server_hostname: "peer0.org4.example.com"
};
module.exports = config;