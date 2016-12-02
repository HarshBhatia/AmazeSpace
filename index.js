var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    api = require('./routes/api'),
    Post = require('./schemas/post_schema'),
    path = require("path");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api', api)
app.get('/post_editor', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/index.html'));
});


app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})
