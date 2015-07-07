var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'What is on my route?' });
});

router.post('/', function (req, res) {
    var newAddress = new models.Address({name: req.body.name, address: req.body.address});
    newAddress.save(function(err, page) {
    	if(err) return next(err);
	    res.redirect('/'+page.name);
	  })
    
});

router.get('/:name', function(req, res, next) {
  //look at page name
  //find the page in the database
  //render a view with that object
  models.Address.findOne({ name: req.params.name }, function(err, page) {
    if(err) return next(err)
    if(!page) return res.status(404).send()

    // for(var key in page) {
    //   res.locals[key] = page[key]
    // }
    console.log(page);
    res.render('one', {name: page.name, address: page.address});
  })
})

//edit button should be on name page
//redirects to new edit page
//clicking save on edit page makes a put request to server
// 	find old documetn and update it and redirect back home
router.get('/:name/edit', function(req, res, next) {
  models.Address.findOne({ name: req.params.name /* use _id here or save var as old name */ }, function(err, page) {
    if(err) return next(err)
    if(!page) return next()
    res.render('edit', { 
      name: page.name, 
      address: page.address, 
     })
  })
})

module.exports = router;
