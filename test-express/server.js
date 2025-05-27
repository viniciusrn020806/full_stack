const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conectar MongoDB (troque a URI pela sua)
mongoose.connect('mongodb+srv://vinirn:7cMdseBjLrEjvNlX@vinirn.afjehzo.mongodb.net/seu_banco?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log('Erro MongoDB:', err));

// Esquemas
const usuarioSchema = new mongoose.Schema({
  nome: String,
  login: String,
  senha: String
});

const carroSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  qtde_disponivel: Number
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
const Carro = mongoose.model('Carro', carroSchema);

// Rotas

// Página inicial - redireciona para login
app.get('/', (req, res) => res.redirect('/login'));

// Cadastro
app.get('/cadastro', (req, res) => res.render('cadastro'));

app.post('/cadastro', async (req, res) => {
  const { nome, login, senha } = req.body;
  await Usuario.create({ nome, login, senha });
  res.redirect('/login');
});

// Login
app.get('/login', (req, res) => res.render('login'));

app.post('/login', async (req, res) => {
  const { login, senha } = req.body;
  const usuario = await Usuario.findOne({ login, senha });
  if (usuario) {
    res.redirect('/carros');
  } else {
    res.send('Login inválido');
  }
});

// Listar carros disponíveis
app.get('/carros', async (req, res) => {
  const carros = await Carro.find();
  res.render('carros', { carros });
});

// Gerenciar carros
app.get('/gerenciar', async (req, res) => {
  const carros = await Carro.find();
  res.render('gerenciar_carros', { carros });
});

// Cadastrar novo carro
app.post('/carros/novo', async (req, res) => {
  const { marca, modelo, ano, qtde_disponivel } = req.body;
  await Carro.create({ marca, modelo, ano, qtde_disponivel });
  res.redirect('/gerenciar');
});

// Remover carro
app.post('/remover/:id', async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.redirect('/gerenciar');
});

// Editar carro - mostrar formulário
app.get('/editar/:id', async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  res.render('editar_carro', { carro });
});

// Atualizar carro
app.post('/atualizar/:id', async (req, res) => {
  const { marca, modelo, ano, qtde_disponivel } = req.body;
  await Carro.findByIdAndUpdate(req.params.id, { marca, modelo, ano, qtde_disponivel });
  res.redirect('/gerenciar');
});

// Vender carro (decrementar quantidade)
app.post('/vender/:id', async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  if (carro.qtde_disponivel > 0) {
    carro.qtde_disponivel -= 1;
    await carro.save();
  }
  res.redirect('/carros');
});

// Rodar servidor na porta 3000
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
