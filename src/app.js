const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const index = require('./routes/index');

/*----rotas-------*/
const userRoute = require('./routes/user.route');
const tipoSituacaoRoute = require('./routes/tipoSituacao.route');
const formaPagamentoRoute = require('./routes/formaPagamento.route');
const tipoGastoRoute = require('./routes/tipoGasto.route');
const tipoEnderecoRoute = require('./routes/tipoEndereco.route');
const categoria = require('./routes/categoria.route');
const estado = require('./routes/estado.route');
const cidade = require('./routes/cidade.route');
const produto = require('./routes/produto.route');
const cliente = require('./routes/cliente.route');
const endereco = require('./routes/endereco.route');
const orcamentoVenda = require('./routes/orcamentoVenda.route');
const orcamentoVendaItem = require('./routes/orcamentoVendaItem.route');
const clienteendereco = require('./routes/clienteendereco.route');
const despesa = require('./routes/despesa.route');
const cep = require('./routes/cep.route');
/*----rotas-------*/

const { sequelize } = require('./models')

/*
app.use(express.static(path.resolve(__dirname, '../client/build')));*/

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(index);
app.use('/api/', userRoute);
app.use('/api/', tipoSituacaoRoute);
app.use('/api/', formaPagamentoRoute);
app.use('/api/', tipoGastoRoute);
app.use('/api/', tipoEnderecoRoute);
app.use('/api/', categoria);
app.use('/api/', estado);
app.use('/api/', cidade);
app.use('/api/', produto);
app.use('/api/', cliente);
app.use('/api/', endereco);
app.use('/api/', orcamentoVenda);
app.use('/api/', orcamentoVendaItem);
app.use('/api/', clienteendereco);
app.use('/api/', despesa);
app.use('/api/', cep);
/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });*/

sequelize.sync().then(() => {
    console.log("conectado ao banco")
})

module.exports = app;