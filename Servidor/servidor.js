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
server.listen(80, () => console.log('Servidor rodando...'.rainbow));

client.connect().then(() => {
  const dbo = client.db("exemplo_bd");
  const usuarios = dbo.collection("usuarios");

  // Rota para cadastrar novo usuário
  app.post("/cadastrar_usuario", function (req, resp) {
    const data = { db_login: req.body.nome, db_senha: req.body.senha };

    usuarios.insertOne(data, function (err) {
      if (err) {
        resp.render('resposta_usuario', { resposta: "Erro ao cadastrar usuário!" });
      } else {
        resp.render('resposta_usuario', { resposta: "Usuário cadastrado com sucesso!", nome: req.body.nome });
      }
    });
  });

  // Rota para login de usuário
  app.post("/logar_usuario", function (req, resp) {
    const data = { db_login: req.body.login, db_senha: req.body.senha };

    usuarios.find(data).toArray(function (err, items) {
      if (err) {
        resp.render('resposta_erro', { resposta: "Erro ao logar usuário!" });
      } else if (items.length == 0) {
        resp.render('resposta_erro', { resposta: "Usuário/senha não encontrado!" });
      } else {
        resp.render('resposta_usuario', { resposta: "Usuário logado com sucesso!", nome: req.body.login });
      }
    });
  });

   // ✅ NOVA ROTA PARA FORMULÁRIO DE CADASTRO COMPLETO (nome, sobrenome, etc.)
  app.post("/cadastro", function (req, res) {
    console.log(req.body); // veja o que está chegando
    const nome = req.body.nome;
    const senha = req.body.senha;
    
    console.log("Dados recebidos:", req.body);
    console.log("Renderizando com senha =", req.body.senha);

    res.render('resposta_cadastro', { 
      nome, 
      senha 
    });

    // Se quiser salvar em uma nova coleção:
    // const pessoas = dbo.collection("pessoas");
    // pessoas.insertOne({ nome, sobrenome, nascimento, civil, senha });
  });

}); // <-- fechamento correto do .then()

// 🔴 O .catch precisa ficar fora do .then()
client.connect().catch(err => {
  console.error("Erro ao conectar no MongoDB:", err);
});