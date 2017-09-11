var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var dbConfig = require('./connectionObject');

//load navigational routes
var routes = require('./routes');
//load api routes
var books = require('./routes/books'); 

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');


//Middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); //Όταν έρχεται ένα request με header Content-type JSON κάνει το payload(dedomena) kateutheian se JSON body sthn parametro req.body
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    connection(mysql, dbConfig,'single')
);

app.get('/', routes.index);
app.post('/books', books.save);
app.get('/books/:title', books.list);

app.use(function(err, req, res, next){
    res.status(422).send({error:err.message, stack: err.stack});
});

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});