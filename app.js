const express = require('express');
const homeRoutes = require('./routes/index.js');
const signinRoutes = require('./routes/signin.js');
const signupRoutes = require('./routes/signup.js');
const paymentRoutes = require('./routes/payment.js');
const movieRoutes = require('./routes/movie.js');
const bodyParser = require('body-parser');
const MoviesRoutes = require('./routes/movies.js');
const carrinhoRoutes = require('./routes/carrinho.js');
const carrinhoRoutes2 = require('./routes/carrinho_qualidade.js');
const session = require('express-session');
const atualizaruserRoutes = require('./routes/infousuario.js');
const logoutRoutes = require('./routes/logout.js');
const admRoutes = require('./routes/administracao.js');
const cadastroFilemsRoutes = require('./routes/cadastrar_filme.js');
const editFilmeRoutes = require('./routes/editarfilme.js');;
const subConsultaRoutes = require('./routes/subconsulta.js');
const subConsultaOrdenadaRoutes = require('./routes/subconsultaordenada.js');



//query genérica


//app e configurações iniciais
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret : 'teste',
    resave : true,
    saveUninitialized : true
}));

//view engine
app.set('view engine','ejs');
app.listen(8800);

//teste
console.log('test');

//incializando as rotas
app.use('/',homeRoutes);
app.use('/signin',signinRoutes);
app.use('/signup', signupRoutes);
app.use('/payment', paymentRoutes);
app.use('/movie', movieRoutes);
app.use('/movies',MoviesRoutes);
app.use('/atualizarusuario', atualizaruserRoutes);
app.use('/carrinho',carrinhoRoutes);
app.use('/carrinho_qualidade',carrinhoRoutes2);
app.use('/logout', logoutRoutes);
app.use('/administracao', admRoutes);
app.use('/cadastrarfilme', cadastroFilemsRoutes);
app.use('/editarfilme', editFilmeRoutes);
app.use('/subconsulta',subConsultaRoutes);
app.use('/subconsultaordenada',subConsultaOrdenadaRoutes);






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

