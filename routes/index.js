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
    res.render('one', {
      name: page.name,
      address: page.address
    });
  })
})

router.get('/:name/edit', function(req, res, next) {
  //look at page name
  //find the page in the database
  //render a view with that object
  models.Address.findOne({
    name: req.params.name
  }, function(err, page) {
    if (err) return next(err)
    if (!page) return res.status(404).send()
    res.render('edit', {
      name: page.name,
      address: page.address
    });
  })
})


router.post('/:name/edit', function(req, res, next) {
  console.log('post called')
  models.Address.findOne({
    name: req.params.name
  }, function(err, address) {
    if (!address) return next()



    //I'm overwriting properites on address that exist in req.body
    //namely title and body
    for (var key in req.body) {
      address[key] = req.body[key]
    }

    address.save(function(err, address) {
      console.log(err)
      if (err) return next(err)
      console.log('this is address before redirect', address)
      res.redirect('/')
    })
  });
})

//one address or trip page should have an edit button


//should be a way to see all of the addresses and all of the trips

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