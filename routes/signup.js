const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) { // Logar
    if(req.session.username) {
        res.redirect('signin');
    }
    else res.render('pages/signup', { session : req.session });
});

router.post('/', function(request, response, next) { // Registrar
    var cpf = request.body.cpf;
    var username = request.body.username;
    var senha = request.body.senha;
    var dataNascimento = request.body.dataNascimento;

    if(cpf && username && senha && dataNascimento) {
        if(cpf.length != 11 || !contemApenasNumeros(cpf)) {
            response.send("CPF inválido");
            response.end();
            return;
        }

        query = `INSERT INTO usuario VALUES 
        ("${cpf}", "${username}", "${dataNascimento}", "${senha}");`;

        database.query(query, function(error, data) {
            if(error) {
                if(error.code === "ER_DUP_ENTRY") { // Violando chave única ou primária
                    if(error.message.search('usuadrio.PRIMARY') !== -1) { // Chave primária
                        response.send('CPF já cadastrado\n')
                    }
                    else if(error.message.search('usuario.usuario__uk') !== -1) { // Chave Única
                        response.send('Username já usado\n');
                    }
                    else {
                        response.send(error.code);
                    }
                }
                else if(error.code === "ER_DATA_TOO_LONG") { // Campo muito grande
                    if(error.message.includes("username")) {
                        response.send("O username é muito longo");
                    }
                    else if(error.message.includes("cpf")) {
                        response.send("O cpf apenas pode ter 11 caracteres");
                    }
                    else if(error.message.includes("senha")) {
                        response.send("A senha é muito longa");
                    }
                }
                else if(error.message.includes("tamanhosenha")) { // Senha curta
                    response.send("A senha deve conter 'x' caracteres");
                }
            }
            else {
                // response.send('Registrado com sucesso!');
                response.redirect('signin');
                request.session.username = username;
            }

            response.end();
        });
    }
})

function contemApenasNumeros(string) {
    return /^\d+$/.test(string);
}

module.exports = router;