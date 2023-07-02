const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pages/index', { session : req.session} );
});

module.exports = router;
