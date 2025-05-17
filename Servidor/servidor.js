const http = require('http');
const express = require('express');
const colors = require('colors');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://vinirn:7cMdseBjLrEjvNlX@vinirn.afjehzo.mongodb.net/?retryWrites=true&w=majority&appName=vinirn";
const client = new MongoClient(uri, { useNewUrlParser: true });

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './views');

const server = http.createServer(app);
server.listen(80, () => console.log('Servidor rodando na porta 80...'.rainbow));

client.connect().then(() => {
  const dbo = client.db("exemplo_bd");
  const usuarios = dbo.collection("usuarios");
  const posts = dbo.collection("posts"); // <- COLEÇÃO DE POSTS

  // Página inicial redireciona para Projects.html
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/Projects.html");
  });

  // Página para exibir posts
  app.get("/blog", (req, res) => {
    posts.find().toArray((err, resultados) => {
      if (err) return res.send("Erro ao buscar posts.");
      res.render("blog", { posts: resultados });
    });
  });

  // Página com formulário de criação
  app.get("/cadastrar_post", (req, res) => {
    res.sendFile(__dirname + "/public/cadastrar_post.html");
  });

  // Rota para salvar post
  app.post("/cadastrar_post", (req, res) => {
    const { titulo, resumo, conteudo } = req.body;
    posts.insertOne({ titulo, resumo, conteudo }, (err, result) => {
      if (err) return res.send("Erro ao salvar post.");
      res.redirect("/blog");
    });
  });

  // Rota para cadastrar novo usuário
  app.post("/cadastrar_usuario", (req, res) => {
    const nome = req.body.nome;
    const senha = req.body.senha;
    const data = { db_login: nome, db_senha: senha };

    usuarios.insertOne(data, (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.render('resposta_usuario', { resposta: "Erro ao cadastrar usuário!" });
      } else {
        res.render('resposta_usuario', { resposta: "Usuário cadastrado com sucesso!", nome });
      }
    });
  });

  // Rota para login de usuário
  app.post("/logar_usuario", (req, res) => {
    const nome = req.body.login;
    const senha = req.body.senha;
    const data = { db_login: nome, db_senha: senha };

    usuarios.find(data).toArray((err, items) => {
      if (err) {
        res.render('resposta_erro', { resposta: "Erro ao logar usuário!" });
      } else if (items.length === 0) {
        res.render('resposta_erro', { resposta: "Usuário/senha não encontrado!" });
      } else {
        res.render('resposta_usuario', { resposta: "Usuário logado com sucesso!", nome });
      }
    });
  });

}).catch(err => {
  console.error("Erro ao conectar no MongoDB:", err);
});
