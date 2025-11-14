const { orcamentoVenda, orcamentoVendaItem } = require("../models")
const { Sequelize } = require("sequelize")

exports.totalizeOrcamentoVenda = async (idOrcamentoVenda) => {

    console.log(idOrcamentoVenda)

    const Itens = await orcamentoVendaItem.findAll({
        attributes: [
            [Sequelize.literal('SUM(quantidade * valor)'), 'TotalValor']
        ],
        where: { idOrcamentoVenda, inativo: false },
        raw: true
    });
    
    const TotalItems = Itens.reduce((total, item) => total + parseFloat(item.TotalValor), 0) || 0

    const OrcamentoVenda = await orcamentoVenda.findOne({
        where: {
            id: idOrcamentoVenda
        }
    })

    const SubTotal = TotalItems + parseFloat(OrcamentoVenda.frete)
    const Total = SubTotal - parseFloat(OrcamentoVenda.desconto)

    if (Total !== null) {
        orcamentoVenda.update({ valorTotal: Total, subTotal: SubTotal }, { where: { id: idOrcamentoVenda } })
    }
}