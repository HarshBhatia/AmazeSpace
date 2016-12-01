var express = require('express'),
    mongoose = require('mongoose'),
    Post = require('../schemas/post_schema');

var router = express.Router(),
    db = mongoose.connection;

mongoose.connect('mongodb://theharshb:sheldon1@ds017736.mlab.com:17736/amazer');

//db connection error handler
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected!")
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening on the api.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'This is the api route!' });
});
router.route('/posts')
    .get(function(req, res) {

        Post.find(function(err, posts) {
            if (err)
                res.send(err);

            res.json(posts);
        });
    })
    .post(function(req, res) {
        var post = new Post();
        post.title = req.body.title;
        post.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Post created!' });
        });
    });

router.route('/posts/:post_id')
    .get(function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })
    .put(function(req, res) {
        Post.findById(req.params.post_id, function(err, post) {
            if (err) {
                res.send(err);
            }
            post.title = req.body.title;
            post.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Post updated!' });
            });

        })
    })
    .delete(function(req, res) {
        Post.remove({
            _id: req.params.post_id
        }, function(err, post) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        })
    })


module.exports = router;
