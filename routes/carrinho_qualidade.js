const express = require('express');
const router = express.Router();
const database = require('../db.js');


router.get('/', function(req, res, next) {
    res.render('pages/carrinho',{ session : req.session} );
  });

router.post('', function(request, response, next){

    var qualidade4k = request.body.qualidade4k;
    var qualidade1080p = request.body.qualidade1080p;
    var qualidade720p = request.body.qualidade720p;

if(qualidade4k === 'true')
    {
        request.session.qualidade4k = true;
        console.log("hello");
    }
    else
    {
        response.end();
    }

    if(qualidade1080p === 'true')
    {
        request.session.qualidade1080p = true;
    }
    else
    {
        response.end();
    }

    if(qualidade720p === 'true')
    {
        request.session.qualidade720p = true;
    }
    else
    {
        response.end();
    }
});

module.exports = router;
