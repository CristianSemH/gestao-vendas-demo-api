const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')
const User = require('./user.model')
const TipoSituacao = require('./tipoSituacao.model')
const FormaPagamento = require('./formaPagamento.model')
const TipoGasto = require('./tipoGasto.model')
const TipoEndereco = require('./tipoEndereco.model')
const Categoria = require('./categoria.model')
const Estado = require('./estado.model')
const Cidade = require('./cidade.model')
const Produto = require('./produto.model')
const Cliente = require('./cliente.model')
const Endereco = require('./endereco.model')
const OrcamentoVenda = require('./orcamentoVenda.model')
const OrcamentoVendaItem = require('./orcamentoVendaItem.model')
const Despesa = require('./despesa.model')

const user = User(sequelize, Sequelize.DataTypes)
const tipoSituacao = TipoSituacao(sequelize, Sequelize.DataTypes)
const formaPagamento = FormaPagamento(sequelize, Sequelize.DataTypes)
const tipoGasto = TipoGasto(sequelize, Sequelize.DataTypes)
const tipoEndereco = TipoEndereco(sequelize, Sequelize.DataTypes)
const categoria = Categoria(sequelize, Sequelize.DataTypes)
const estado = Estado(sequelize, Sequelize.DataTypes)
const cidade = Cidade(sequelize, Sequelize.DataTypes)
const produto = Produto(sequelize, Sequelize.DataTypes)
const cliente = Cliente(sequelize, Sequelize.DataTypes)
const endereco = Endereco(sequelize, Sequelize.DataTypes)
const orcamentoVenda = OrcamentoVenda(sequelize, Sequelize.DataTypes)
const orcamentoVendaItem = OrcamentoVendaItem(sequelize, Sequelize.DataTypes)
const despesa = Despesa(sequelize, Sequelize.DataTypes)

produto.belongsTo(categoria, { foreignKey: 'idCategoria', as: 'categoria' })
cidade.belongsTo(estado, { foreignKey: 'idEstado' })
endereco.belongsTo(cidade, { foreignKey: 'IdCidade' })
cliente.hasMany(endereco, { foreignKey: 'idCliente' })
endereco.belongsTo(cliente, { foreignKey: 'idCliente' })

orcamentoVenda.belongsTo(tipoSituacao, { foreignKey: 'idSituacao' })
orcamentoVenda.belongsTo(cliente, { foreignKey: 'idCliente' })
orcamentoVenda.belongsTo(formaPagamento, { foreignKey: 'idFormaPagamento' })
orcamentoVenda.hasMany(orcamentoVendaItem, { foreignKey: 'idOrcamentoVenda' })

despesa.belongsTo(tipoSituacao, { foreignKey: 'idSituacao' })
despesa.belongsTo(tipoGasto, { foreignKey: 'idTipoGasto' })
despesa.belongsTo(formaPagamento, { foreignKey: 'idFormaPagamento' })

const db = {
    user,
    estado,
    cidade,
    categoria,
    produto,
    cliente,
    endereco,
    tipoSituacao,
    formaPagamento,
    tipoEndereco,
    tipoGasto,
    orcamentoVenda,
    orcamentoVendaItem,
    despesa,
    sequelize
}

module.exports = db