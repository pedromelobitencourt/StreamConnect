const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
    }

    else {
        const id = req.query.id;
        query=`SELECT * FROM filme WHERE id="${id}";
        `
        database.query(query, function(error, data){
            if(error){
                console.log(error);
            }
            else{
                console.log(data)
                res.render('pages/editarfilme', {session : req.session, data: data});
            }
        })
    }
});

router.post('/', function(request, response, next){
    var id = request.body.id
    var nomefilme = request.body.nome;
    var ano = request.body.ano;
    var diretor = request.body.diretor;
    var nota = request.body.notaIMDB;
    var classificacao = request.body.classificacao;
    var sinopse = request.body.sinopse;

    query = `
        UPDATE filme
        SET nome = ?, ano= ?, diretor = ?, notaimdb = ?, classificacao = ?, sinopse = ?
        WHERE id = ?;
        `;
        values = [nomefilme, ano, diretor, nota, classificacao, sinopse, id]
    
        database.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){

                response.redirect('administracao');
                
            }
            response.redirect('administracao');
            response.end();

        });
});


module.exports = router;