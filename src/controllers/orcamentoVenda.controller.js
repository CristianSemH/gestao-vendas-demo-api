const { orcamentoVenda, tipoSituacao, cliente, formaPagamento, orcamentoVendaItem } = require("../models")
const { Op } = require("sequelize");
const totalize = require("../models/totalize.models")
const treatment = require('./errorReturn');

exports.listAll = async (req, res) => {


    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await orcamentoVenda.findAndCountAll({
        order: [
            ['id', 'ASC']],
        include: [
            {
                model: cliente,
                required: false
            },
            {
                model: tipoSituacao,
                required: false
            },
            {
                model: formaPagamento,
                required: false
            }
        ],
        where: {
            inativo: false,
            [Op.or]: [
                {
                    '$Cliente.nome$': {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$FormaPagamento.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$TipoSituacao.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                }
            ]
        },
        offset,
        ...(limit > 0 && { limit })
    }).then(OrcamentoVendas => {
        res.status(200).send(OrcamentoVendas);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {

    const Items = req.body.OrcamentoVendaItems.map(Item => {
        return {
            idProduto: Item.idProduto,
            descricaoProduto: Item.descricaoProduto,
            quantidade: Item.quantidade,
            valor: Item.valor,
            idOrcamentoVenda: Item.idOrcamentoVenda,
        }
    })

    const OrcamentoVenda = {
        dataAbertura: req.body.dataAbertura,
        dataVenda: req.body.dataVenda,
        idSituacao: req.body.idSituacao,
        tipo: req.body.tipo,
        idCliente: req.body.idCliente,
        idClienteEndereco: req.body.idClienteEndereco,
        idFormaPagamento: req.body.idFormaPagamento,
        subTotal: req.body.subTotal,
        valorTotal: req.body.valorTotal,
        desconto: req.body.desconto,
        frete: req.body.frete,
        observacao: req.body.observacao,
        OrcamentoVendaItems: Items
    }

    await orcamentoVenda.create(OrcamentoVenda, {
        include: {
            model: orcamentoVendaItem,
            required: false
        }
    }).then(OrcamentoVenda => {
        totalize.totalizeOrcamentoVenda(OrcamentoVenda.id)
        res.status(201).send(OrcamentoVenda);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVenda.findOne({
        where: {
            inativo: false,
            id
        }, include: [
            {
                model: orcamentoVendaItem,
                required: false,
                where: {
                    inativo: false
                }
            },
            {
                model: cliente,
                required: false
            },
            {
                model: tipoSituacao,
                required: false
            },
            {
                model: formaPagamento,
                required: false
            }
        ]
    }).then(OrcamentoVenda => {
        res.status(200).send(OrcamentoVenda);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {

    const id = parseInt(req.params.id);

    const Items = req.body.OrcamentoVendaItems.map(Item => {
        return {
            id: Item.id,
            idProduto: Item.idProduto,
            descricaoProduto: Item.descricaoProduto,
            quantidade: Item.quantidade,
            valor: Item.valor,
            idOrcamentoVenda: id
        }
    })

    let ItensId = Items.map(item => { return item.id > 0 ? item.id : 0 })

    const OrcamentoVenda = {
        dataAbertura: req.body.dataAbertura,
        dataVenda: req.body.dataVenda,
        idSituacao: req.body.idSituacao,
        tipo: req.body.tipo,
        idCliente: req.body.idCliente,
        idClienteEndereco: req.body.idClienteEndereco,
        idFormaPagamento: req.body.idFormaPagamento,
        subTotal: req.body.subTotal,
        valorTotal: req.body.valorTotal,
        desconto: req.body.desconto,
        frete: req.body.frete,
        observacao: req.body.observacao,
        OrcamentoVendaItems: Items
    }
    const validateOrcamentoVenda = await orcamentoVenda.build(OrcamentoVenda).validate()
        .then(() => {
            return []
        })
        .catch(error => {
            return treatment.messages(error)
        });

    let validateItems = []
    for (const Item of Items) {
        validateItems = await orcamentoVendaItem.build(Item).validate()
            .then(() => {
                return []
            })
            .catch(error => {
                return treatment.messages(error)
            });

        if (validateItems.length > 0) {
            break
        }
    }

    if (validateOrcamentoVenda.length > 0) {
        res.status(400).send(validateOrcamentoVenda);
    } else if (validateItems.length > 0) {
        res.status(400).send(validateItems);
    } else {

        await orcamentoVenda.update(OrcamentoVenda,
            {
                where: {
                    id: id
                }
            })

        for (const Item of Items) {
            if (Item.id) {
                await orcamentoVendaItem.update(Item,
                    {
                        where: {
                            id: Item.id
                        }
                    })
            } else {
                delete Item.id;
                const novoItem = await orcamentoVendaItem.create(Item, { returning: true })
                ItensId.push(novoItem.id)
            }
        }

        await orcamentoVendaItem.update({ inativo: true },
            {
                where: {
                    id: { [Op.notIn]: ItensId }
                }
            })

        await orcamentoVenda.findOne({
            where: {
                inativo: false,
                id
            }, include: [
                {
                    model: orcamentoVendaItem,
                    required: false,
                    where: {
                        inativo: false
                    }
                }
            ]
        }).then(OrcamentoVenda => {
            totalize.totalizeOrcamentoVenda(OrcamentoVenda.id)
            res.status(200).send(OrcamentoVenda);
        }).catch(err => {
            res.status(400).send(treatment.messages(err))
        })
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVenda.update({
        inativo: true
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};