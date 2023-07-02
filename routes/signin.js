const express = require('express');
const router = express.Router();
const database = require('../db.js');

router.get('/', function(req, res, next) {
    res.render('pages/signin',{ session : req.session} );
  });

  router.post('/', function(request, response, next){

    var cpf = request.body.cpf;

    var password = request.body.password;

    if(cpf && password)
    {
        query = `
        SELECT * FROM usuario 
        WHERE cpf = "${cpf}"
        `;

        database.query(query, function(error, data){
          console.log(data);

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].senha == password)
                    {
                        request.session.username = data[count].username;
                        request.session.cpf = data[count].cpf;
                        request.session.senha = data[count].senha;
                        request.session.datanascimento = data[count].datanascimento

                       

                        response.send('Senha correta');
                    }
                    else
                    {
                        response.send('Senha errada');
                    }
                }
            }
            else
            {
                response.send('Email errado');
            }
            response.end();
        });
    }
    else
    {
        response.send('Entre com um cpf e senha');
        response.end();
    }

});

module.exports = router;