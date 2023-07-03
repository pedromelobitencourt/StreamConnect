const express = require('express');
const router = express.Router();
const database = require('../db.js');

let query;

router.get('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
    }
    else {
        query = req.query.query;
        res.render('pages/payment', { session : req.session} );
    }
});

router.post('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
    }
    else {
        console.log("Query ", query);

        if(req.body.carrinho == "2") {
            res.redirect('movies');
            return;
        }

        database.query(query, function(error, data) {
            if(!error) {
                res.redirect('movies');
            }
            else {
                res.status(440).send("Erro no pagamento")
            }
        });
    }
})

module.exports = router;