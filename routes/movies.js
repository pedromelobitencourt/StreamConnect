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
    query2 = `select filme.id, filme.nome, filme.ano, filme.diretor, filme.notaimdb,
    filme.classificacao, filme.sinopse from usuario inner join deseja_assistir on usuario.cpf = 
    deseja_assistir.cpf_usuario inner join filme on deseja_assistir.id_filme =
    filme.id where usuario.cpf = '${cpf}'`;
        connection.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){
                
                connection.query(query2,(error2,resultado2) =>{
                    if(error2)throw error2;

                    if(!error2){
                    console.log(resultado2);
                
                    res.render('pages/movies',{ session : req.session, data: resultado, data2: resultado2});
                    }

                })
                
            }
        })
        
        
        




    
});


module.exports = router; 

