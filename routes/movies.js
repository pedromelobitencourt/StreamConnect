const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');
// const session = require('express-session');

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


router.post('/', function(req, res, next) {
    if(req.body.item1 || req.body.item2) { // Adicionar ou remover da "Lista de desejos"
        console.log(req.body);
        console.log(req.session);

        var item1 = req.body.item1;
        var item2 = req.body.item2;

        var cpf = req.session.cpf;

        if(item1){
            query = `INSERT INTO deseja_assistir (id_filme, cpf_usuario) VALUES(
                ${item1}, "${cpf}"
            );`;

            database.query(query, function(error, data) {
                if(!error) {
                    res.redirect('/movies');
                    return;
                }
                else {
                    console.log(error);
                    if(error.code === "ER_DUP_ENTRY") { // Já adicionou à lista de desejos
                        return;
                    }
                    else {
                        console.log(error);
                        res.status(440).send("Erro no post do movies");
                        return;
                    }
                }
            });
        }
        else if(item2) {
            query = `DELETE FROM deseja_assistir 
                WHERE cpf_usuario = "${cpf}" AND id_filme = ${item2};`;

            database.query(query, function(error, data) {
                if(!error) {
                    res.redirect('/movies');
                    return;
                }
                else {
                    console.log(error);
                    res.status(440).send("Erro no post do movies");
                    return;
                }
            });
        }
    }
});


module.exports = router; 

