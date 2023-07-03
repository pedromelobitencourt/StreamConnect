const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');
const bodyParser = require('body-parser');
const session = require('express-session');

router.get('/', function(req, res, next) {

    if(!req.session.username || req.session.cpf !== "0") { // Não está logado
        res.redirect('signin');
        return;
    }
    query = `
        SELECT * FROM genero
        `;
        connection.query(query,(error,resultado) => {
            

            if(error)throw error;
        
            if(!error){

                res.render('pages/cadastrofilmes',{ session : req.session, genero: resultado });
                
            }
        });
    
});

router.post('/', function(request, response, next) { // Registrar
    var nomefilme = request.body.nome;
    var ano = request.body.ano;
    var diretor = request.body.diretor;
    var nota = request.body.notaIMDB;
    var classificacao = request.body.classificacao;
    var sinopse = request.body.sinopse;
    var atores = [];
    if(request.body.id)

    for (let [key, value] of Object.entries(request.body)) {
        console.log(key, value);
        console.log(key.substring(0,3));
        if(key.substring(0,4)==="ator"){
            atores.push(value)
        }
      }
    console.log("atores: ",atores);
    console.log(request.body);
    var generos = request.body.generos;

    database.query("SELECT MAX(id) 'id' FROM filme;", function error(error, idmax) {
        if(error) {
            console.log(error);
        } else {
            console.log(idmax);
            var id = idmax[0].id + 1 
            query = `INSERT INTO filme (id, nome, ano, diretor, notaimdb, classificacao, sinopse) VALUES 
            ("${id}", "${nomefilme}", "${ano}", "${diretor}", "${nota}", "${classificacao}", "${sinopse}");`;
    
            database.query(query, function(error, resultado) {
            if(error) {
                console.log(error);

            }else{
                console.log(resultado);
                console.log(atores);
                for(var i =0 ; i<atores.length; i++){
                    query2 = `INSERT INTO elenco VALUES 
                    ("${atores[i]}", "${id}");`;
                    database.query(query2, function(error, resultado) {
                        if(error){
                            console.log(error);
            
                        }else{
                            console.log(resultado);
                            for(var j = 0; generos.lenght; j++){
                                query3 = `INSERT INTO tem VALUES 
                                ("${id}", "${generos[i]}");`;
                                database.query(query3, function(error, resultado) {
                                    if(error){
                                        console.log(error);
                        
                                    }else{
                                        console.log(resultado);
                                        return;  
                                    }
                                    });
                            };
                        }
                        });
                }
            }
            });
        }
    });
    response.redirect('administracao');
    response.end();
});

    
   


    


module.exports = router; 