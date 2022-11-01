var https = require('https');
var fs = require('fs');
var https_options = {
key: fs.readFileSync("/ssl/figinvestment.com_key.txt"),
cert: fs.readFileSync("/ssl/figinvestment.com.crt"),
ca: [
fs.readFileSync('ss/figinvestment.com.ca-bundle')
]
};

https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("Welcome to Node.js HTTPS Servern");
    }).listen(8443)