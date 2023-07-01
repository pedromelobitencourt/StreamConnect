const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) {
    res.render('pages/infousuario',{ session : req.session} );
  });

  router.post('/', function(request, response, next){

    var cpf = request.body.cpf;

    var old_pass = request.body.senha_antiga

    var new_password = request.body.senha_nova;

    var data_nascimento = request.body.data

    var nome = request.body.nome

    if(new_password)
    {

        query2 = `
        UPDATE usuario
        SET username = ?, senha= ?, datanascimento = ?
        WHERE cpf = ? AND senha = ?
        `;
        values = [nome, new_password, data_nascimento, cpf, old_pass]
    

            database.query(query2, values, function(error, result){
                console.log(result);
                if(error) {
                    if(error.message.search('usuario.usuario__uk') !== -1) { // Chave Única
                        response.send('Username já usado\n');
                    }
                }else {
                    if(result.changedRows == 0){
                        response.send('Senha Atual incorreta\n');
                    }
                    console.log(result);
                    response.send('Dados Atualizados com sucesso\n' );
                    response.end();
                }
            });
        }
    else
    {

        query2 = `
        UPDATE usuario
        SET username = ?, datanascimento = ?
        WHERE cpf = ? AND senha = ?
        `;
        values = [nome, data_nascimento, cpf, old_pass]
      
              database.query(query2, values, function(error, result){
                console.log(result);
                if(error) {
                    if(error.message.search('usuario.usuario__uk') !== -1) { // Chave Única
                        response.send('Username já usado\n');
                    }
                }else {
                    if(result.changedRows == 0){
                        response.send('Senha Atual incorreta\n');
                    }
                    console.log(result);
                    response.send('Dados Atualizados com sucesso\n' );
                    response.end();
                }
              })
    }
})

module.exports = router;