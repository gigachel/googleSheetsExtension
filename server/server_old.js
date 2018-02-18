var http = require('http');
var fs = require('fs');
var oauth = fs.readFileSync('../src/popup/popup.html');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(oauth);
}).listen(8000);

console.log('Server running on port 8000');
