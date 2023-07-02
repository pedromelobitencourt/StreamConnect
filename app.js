const express = require('express')
const bodyParser = require('body-parser')
const homeRoutes = require('./routes/home.js')
const signinRoutes = require('./routes/signin.js')
const MoviesRoutes = require('./routes/movies.js')
const session = require('express-session')



//query genérica


//app e configurações iniciais
const app = express()
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret : 'teste',
    resave : true,
    saveUninitialized : true
}));
//view engine
app.set('view engine','ejs')
app.listen(8800)
//teste
console.log('test')
//incializando as rotas
app.use('/',homeRoutes)
app.use('/signin',signinRoutes)
app.use('/movies',MoviesRoutes)






//teste
/*app.get('/',function(req,res){
    


    connection.query('SELECT * FROM usuario',(error,resultado) => {

        if(error)throw error;
    
        if(!error){
            console.log(resultado);
            res.render('pages/index',{resultado})
            
        }
    })
}
)*/

