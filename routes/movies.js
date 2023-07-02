const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) {
    res.render('pages/movies',{ session : req.session} );
});


module.exports = router;