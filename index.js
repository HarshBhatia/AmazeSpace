var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    api = require('./routes/api'),
    Post = require('./schemas/post_schema'),
    path = require("path"),
    spdy = require('spdy'),
    fs = require('fs');

const port = 3000;

var options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt'),
};

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', api)
app.get('/post_editor', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/index.html'));
});

spdy
    .createServer(options, app)
    .listen(port, (error) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        } else {
            console.log('Listening on port: ' + port + '.')
        }
    })
