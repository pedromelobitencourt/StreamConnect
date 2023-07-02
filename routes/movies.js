const express = require('express');
const router = express.Router();
const database = require('../db.js');
const connection = require('../db.js');

router.get('/', function(req, res, next) {

    query = `
        SELECT * FROM filme
        `;
        connection.query(query,(error,resultado) => {

            if(error)throw error;
        
            if(!error){
                console.log(resultado);
                res.render('pages/movies',{ session : req.session, data: resultado});
                
            }
        })
        
        
        

       



    
});


module.exports = router;