const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');
const session = require('express-session');

router.get('/', function(req, res, next) {
    if(!req.session.username || req.session.cpf !== "0") { // Não está logado
        res.redirect('signin');
        return;
    }

    var id = req.query.id;

    console.log(req.query);

    if(id) {
        query = `DELETE FROM filme WHERE id = ${id};`;

        database.query(query, function(error, data) {
            if(!error) {
                delete req.query.id;
                res.redirect('administracao');
                return;
            }
            else {
                console.log("Erro na administração deletar: ", error);
                res.status(440).send("Erro");
                return;
            }
        });
    }

    var cpf =  req.session.cpf;
    query = `
        SELECT * FROM filme
        `;
        connection.query(query,(error,resultado) => {
            if(error)throw error;
        
            if(!error){
                res.render('pages/administracao',{ session : req.session, data: resultado });
                
            }
        });
});

router.post('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
        return;
    }
});



module.exports = router; 
