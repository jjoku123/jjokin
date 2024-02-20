var http = require('http');
var fs = require('fs');

//HTTP server that listens port 8080
http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'json'
    });

    fs.readFile('data.json', function(err, content){
        response.write(content);
        response.end();
    });

}).listen(8080);