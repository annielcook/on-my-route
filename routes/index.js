var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'What is on my route?'
    });
});



router.post('/', function(req, res, next) {
    var start, end
    console.log(req.body);

    models.Address.create({
            name: req.body.name[0],
            address: req.body.address[0]
        })
        .then(function(one) {
            start = one
            return models.Address.create({
                name: req.body.name[1],
                address: req.body.address[1]
            })
        })
        .then(function(two) {
            end = two
            return models.Trip.create({
                start: start._id,
                end: end._id,
                route_name: req.body.name[2]
            })
        })
        .then(function(trip) {
            res.send(trip)
        })
        .then(null, next);
});

router.get('/:name', function(req, res, next) {
    //look at page name
    //find the page in the database
    //render a view with that object
    models.Address.findOne({
        name: req.params.name
    }, function(err, page) {
        if (err) return next(err)
        if (!page) return res.status(404).send()

        // for(var key in page) {
        //   res.locals[key] = page[key]
        // }
        console.log(page);
        res.render('one', {
            name: page.name,
            address: page.address
        });
    })
})

//edit button should be on name page
//redirects to new edit page
//clicking save on edit page makes a put request to server
//  find old documetn and update it and redirect back home
router.put('/:name', function(req, res) {
    models.Address.findOne({
        name: req.params.name
    }, function(err, address) {
        if (err) {
            return res.send(err);
        }
        console.log(req.body)
        for (prop in req.body) {
            address[prop] = req.body[prop];
        }

        // save the movie
        address.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({
                message: 'Address updated!'
            });
        });
    });
});

router.delete('/:name', function(req, res) {
    models.Address.remove({
        name: req.params.name
    }, function(err, address) {
        if (err) {
            return res.send(err);
        }

        res.json({
            message: 'Successfully deleted'
        });
    });
});

module.exports = router;