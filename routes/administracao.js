const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');
const session = require('express-session');

router.get('/', function(req, res, next) {

    if(!req.session.username) { // Não está logado
        res.redirect('signin');
        return;
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
        })
        
        
        




    
});


module.exports = router; 
