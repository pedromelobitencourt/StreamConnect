const express = require('express');
const router = express.Router();
const database = require('../db.js');

let idCount = 0;

router.get('/', function(req, res, next) {
    res.render('pages/carrinho',{ session : req.session} );
  });

  router.post('', function(request, response, next){

    var movie = request.body.movie;
    var price1 = request.body.price1;
    var price2 = request.body.price2
    var qualidade1 = request.body.qualidade1;
    var qualidade2 = request.body.qualidade2;
    
    if(movie)
    {
        query = `
        SELECT * FROM filme
        WHERE nome = "${movie}"
        `;

        database.query(query, function(error, data){
          console.log(data);

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].nome == movie)
                    {
                        request.session.FilmeEncontrado = data[count].nome;
                        request.session.FilmeEncontradoId = data[count].id;
                    }
                    else
                    {
                        response.send('Filme não encontrado');
                    }
                }
            }
            response.end();
        });
    }
    else
    {
        response.end();
    }

    if(price1)
    {

        query = `
        INSERT INTO pedido (id, id_filme, cpf_usuario, tipo, qualidade, preco) 
          VALUES (${idCount}, ${request.session.FilmeEncontradoId}, "${request.session.cpf}", 'C', '${qualidade1}', ${price1})
        `;

        database.query(query, function(error, data){
          console.log(data);
        });

        console.log(price1);
        console.log(qualidade1);    
        console.log(request.session.FilmeEncontrado); 
        console.log(request.session.cpf); 

        idCount++;
        request.session.FilmeEncontrado = null;
        console.log(request.session.FilmeEncontrado); 

    }

    if(price2)
    {
        query = `
        INSERT INTO pedido (id, id_filme, cpf_usuario, tipo, qualidade, preco) 
          VALUES (${idCount}, ${request.session.FilmeEncontradoId}, "${request.session.cpf}", 'A', '${qualidade2}', ${price2})
        `;

        database.query(query, function(error, data){
          console.log(data);
        });

        console.log(price2);
        console.log(qualidade2);    
        console.log(request.session.FilmeEncontrado); 
        console.log(request.session.cpf); 

        idCount++;
        request.session.FilmeEncontrado = null;
        console.log(request.session.FilmeEncontrado); 
    }

});
module.exports = router;

