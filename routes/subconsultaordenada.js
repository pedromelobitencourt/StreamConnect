const express = require('express');
const router = express.Router();
const connection = require('../db.js');
// const session = require('express-session');
    


router.get('/', function(req, res, next) {

    if(!req.session.username) { // Não está logado
        res.redirect('signin');
        return;
    }

    var cpf =  req.session.cpf;
    query = `
    SELECT subquery.nome, subquery.total_pedidos
FROM (
    SELECT filme.nome, COUNT(pedido.id_filme) AS total_pedidos
    FROM filme
    LEFT OUTER JOIN pedido ON filme.id = pedido.id_filme
    GROUP BY filme.nome
    HAVING COUNT(pedido.id_filme) >= 1
) AS subquery
ORDER BY subquery.total_pedidos DESC, subquery.nome ASC;
        `;
    
        connection.query(query,(error,resultado) => {
            if(error)throw error;
            if(!error){
                res.render('pages/subconsultaordenada',{ session : req.session, data: resultado});
            }
            

            
        })

    
});




module.exports = router; 
