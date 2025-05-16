var http = require('http');
var express = require('express');
var colors = require('colors');
var bodyParser = require('body-parser');

var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;


const uri = "mongodb+srv://vinirn:upVEUPe0EAQlUbU7@vinirn.afjehzo.mongodb.net/?retryWrites=true&w=majority&appName=vinirn";


const client = new MongoClient(uri, { useNewUrlParser: true });

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);

console.log('Servidor rodando ...'.rainbow);
const dbo = client.db("exemplo_bd");
const usuarios = dbo.collection("usuarios");
 
app.post("/cadastrar_usuario", function(req, resp) {
    var data = { db_login: req.body.nome, db_senha: req.body.senha };

    usuarios.insertOne(data, function (err) {
      if (err) {
        resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
      }else {
        resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
      };
    });
   
});
 app.post("/logar_usuario", function(req, resp) {
    var data = {db_login: req.body.login, db_senha: req.body.senha };

    usuarios.find(data).toArray(function(err, items) {
      console.log(items);
      if (items.length == 0) {
        resp.render('resposta_erro', {resposta: "Usuário/senha não encontrado!"})
      }else if (err) {
        resp.render('resposta_erro', {resposta: "Erro ao logar usuário!"})
      }else {
        resp.render('resposta_usuario', {resposta: "Usuário logado com sucesso!", nome: req.body.login})            
      };
    });

  });



app.get('/', function (requisicao, resposta){
resposta.redirect('home.html')
})

app.get('/inicio', function (requisicao, resposta){
var nome = requisicao.query.info;
console.log(nome);
})

app.post('/inicio', function (requisicao, resposta){
var data = requisicao.body.data;
console.log(data);
})

app.post('/cadastro',function (requisicao, resposta){
var nome = requisicao.query.nome;
var sobrenome = requisicao.query.sobrenome;
var nascimento = requisicao.query.nascimento;
var civil = requisicao.query.civil;

resposta.render('resposta_cadastro', {nome, sobrenome, nascimento, civil})
})
