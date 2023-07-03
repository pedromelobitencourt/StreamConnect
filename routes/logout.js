const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) {
    delete req.session.username;
    res.render('pages/signin', { session : req.session} );
});

module.exports = router;