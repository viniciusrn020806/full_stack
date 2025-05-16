const http = require('http');
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://vinirn:upVEUPe0EAQlUbU7@vinirn.afjehzo.mongodb.net/?retryWrites=true&w=majority&appName=vinirn";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

const server = http.createServer(app);
server.listen(3000, () => console.log('Servidor rodando na porta 3000...'.rainbow));

client.connect().then(() => {
  const dbo = client.db("exemplo_bd");
  const usuarios = dbo.collection("usuarios");

  // Rota para cadastrar novo usuário (usada no formulário)
  app.post("/cadastrar_usuario", (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;

    const data = { db_login: nome, db_senha: senha };
    console.log('Tentando cadastrar usuário:', data);

    usuarios.insertOne(data, (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.render('resposta_usuario', { resposta: "Erro ao cadastrar usuário!" });
      } else {
        console.log('Usuário cadastrado com sucesso. ID:', result.insertedId);
        res.render('resposta_usuario', { resposta: "Usuário cadastrado com sucesso!", nome });
      }
    });
  });

  // Rota para login de usuário
  app.post("/logar_usuario", (req, res) => {
    const nome = req.body.login;
    const senha = req.body.senha;

    const data = { db_login: nome, db_senha: senha };
    console.log('Tentando logar usuário com:', data);

    usuarios.find(data).toArray((err, items) => {
      if (err) {
        console.error('Erro ao logar usuário:', err);
        res.render('resposta_erro', { resposta: "Erro ao logar usuário!" });
      } else if (items.length === 0) {
        console.log('Usuário/senha não encontrado para:', data);
        res.render('resposta_erro', { resposta: "Usuário/senha não encontrado!" });
      } else {
        console.log('Usuário logado com sucesso:', items[0]);
        res.render('resposta_usuario', { resposta: "Usuário logado com sucesso!", nome });
      }
    });
  });

}).catch(err => {
  console.error("Erro ao conectar no MongoDB:", err);
});
