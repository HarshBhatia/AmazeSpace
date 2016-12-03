var spdy = require('spdy'),
    fs = require('fs');

var options = {
  // Private key
  key: fs.readFileSync(__dirname + '/server.key'),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync(__dirname + '/server.crt'),

 
};

var server = spdy.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world!');
});

server.listen(3000);