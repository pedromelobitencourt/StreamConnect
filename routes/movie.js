const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.post('/', function(req, res, next) {
    var rate = req.body;
    // res.send("apertou");

    console.log(req.body);

    // console.log("OIHJiughiuygsijhk");
});

router.get('/', function(req, res, next) {
    // if(!req.session.username) { // Não está logado
    //     res.redirect('signin');
    // }
    // else {
        req.body.filme = 3; // id do filme
        var idFilme = req.body.filme;

        // Procurar o filme com base no id
        query1 = `SELECT nome, ano, diretor, 
        notaimdb, classificacao, sinopse 
        FROM filme 
        WHERE id = ${idFilme};`;

        database.query(query1, function(error1, data1) {

            if(data1.length > 0) { // Tem filme com o id
                var filme = data1[0];

                req.session.nomeFilme = filme.nome;
                req.session.anoFilme = filme.ano;
                req.session.diretorFilme = filme.diretor;
                req.session.notaImdb = filme.notaimdb;
                req.session.classificacaoFilme = filme.classificacao;
                req.session.sinopseFilme = filme.sinopse;


                // Categorias do filme
                query2 = `SELECT nome_genero FROM tem 
                WHERE id_filme = ${idFilme};`;

                var generos = "";

                database.query(query2, function(error2, data2) {
                    if(!error2) {
                        for(var i = 0; i < data2.length; i++) {
                            var genero = data2[i].nome_genero;

                            generos += genero + ", ";
                        }

                        if(generos[generos.length - 2] === ',')
                            generos = generos.substring(0, generos.length - 2);

                        req.session.generos = generos;
                        res.render('pages/movie_page', { session : req.session } );
                    }
                    else {
                        res.send(error2);
                    }
                });
            }
            else { // Erro
                res.send("Não há o filme")
            }

            if(error1) res.send(error1);
        });
    //}
});

module.exports = router;