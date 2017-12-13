var hfc = require('fabric-client');

var tx_id = null;

for (var i = 0; i <= 10; i++) {
	client = new hfc();
	tx_id = client.newTransactionID();
	console.log(tx_id);
}
