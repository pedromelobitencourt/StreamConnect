const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.post('/', function(req, res, next) {
    var rate = req.body.rate;
    var filme = req.session.idFilme;
    var cpf = req.session.cpf;

    if(rate && filme && cpf) {
        query = `INSERT INTO avaliacao
        VALUES(${filme}, "${cpf}", CURDATE(), ${rate});`;

        database.query(query, function(error1, data1) {
            if(error1) {
                if(error1.code === "ER_DUP_ENTRY") { // Avaliando novamente
                    query = `UPDATE avaliacao SET nota = ${rate} 
                    WHERE id_filme = ${filme} AND cpf_usuario = ${cpf};`;

                    database.query(query, function(error2, data2) {
                        console.log(query);

                        if(error2) {
                            res.status(440).send(error2);
                        }
                    });
                }
                else {
                    res.status(440).send(error1);
                }
                console.log(error1);
            }
        });
    }
});

router.get('/', function(req, res, next) {
    if(!req.session.username) { // Não está logado
        res.redirect('signin');
    }
    else {
        console.log(req.query);

        const id = req.query.id;
        const cpf = req.session.cpf;

        // Ver se o usuário tem o filme
        query = `SELECT * FROM pedido 
        WHERE cpf_usuario = "${cpf}" AND 
        id_filme = ${id}`;

        database.query(query, function(error, data) {
            if(!error) {
                if(data.length > 0) { // Já teve o filme
                    for(let i = 0; i < data.length; i++) {
                        if(data[i].tipo === "C" || data[i].tipo === "A") {
                            var idFilme = id;

                            req.session.qualidade = data[i].qualidade;

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
                                    req.session.idFilme = idFilme;


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

                                            // Elenco
                                            query3 = `SELECT nome FROM elenco WHERE id_filme = ${idFilme};`;

                                            var elenco = "";

                                            database.query(query3, function(error3, data3) {
                                                console.log(data3);
                                                if(!error3) {
                                                    for(var i = 0; i < data3.length; i++) {
                                                        var e = data3[i].nome;

                                                        elenco += e + ", ";
                                                    }

                                                    if(elenco[elenco.length - 2] === ',')
                                                        elenco = elenco.substring(0, elenco.length - 2);

                                                    req.session.elencoFilme = elenco;
                                                    res.render('pages/movie_page', { session : req.session } );
                                                }
                                                else {
                                                    res.send(error3);
                                                }
                                            });

                                            //res.render('pages/movie_page', { session : req.session } );
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
                            break;
                        }
                    }
                }
                else { // Não tem o filme
                    res.redirect('/carrinho?id=' + id);
                }
            }
        })

        
    }
});

module.exports = router;