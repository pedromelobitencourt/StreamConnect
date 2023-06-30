const express = require('express')
const mysql =  require('mysql')


//criando conexão com o db
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"legal2002",
    database: "streamconnect"

})
//query genérica


//app
const app = express()


//view engine
app.set('view engine','ejs')

//teste rota incial
app.get('/',function(req,res){
    


    connection.query('SELECT * FROM usuario',(error,resultado) => {

        if(error)throw error;
    
        if(!error){
            console.log(resultado);
            res.render('pages/index',{resultado})
            
        }
    })
}
)
//configurações iniciais
app.use(express.static(__dirname + '/public'));
app.listen(8800)

//teste
console.log('test')


