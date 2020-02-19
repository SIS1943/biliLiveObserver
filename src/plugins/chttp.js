const https = require('https');
const zlib = require('zlib');
const fs = require('fs');

function get(options, reqdata = null , res){
    var req = https.request(options,function (res) {
    });
    req.write(reqdata);
    req.on('response', function (response) {
        switch (response.headers['content-encoding']) {
            case 'gzip':
                var body = '';
                var gunzip = zlib.createGunzip();
                response.pipe(gunzip);
                gunzip.on('data', function (data) {
                    body += data;
                });
                gunzip.on('end', function () {
                    var returndatatojson= JSON.parse(body);
                    req.end();
                });
                gunzip.on('error', function (e) {
                    console.log('error' + e.toString());
                    req.end();
                });
                break;
            case 'deflate':
                var output = fs.createWriteStream("d:temp.txt");
                response.pipe(zlib.createInflate()).pipe(output);
                req.end();
                break;
            default:req.end();
                break;
        }
    });
    req.on('error', function (e) {
        console.log(new Error('problem with request: ' + e.message));
        req.end();
    });
}

export default {
    get
}