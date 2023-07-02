const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
    }
    else 
        res.render('pages/payment', { session : req.session} );
});

module.exports = router;