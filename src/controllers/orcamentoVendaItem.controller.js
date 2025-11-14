
const { orcamentoVendaItem } = require("../models")
const totalize = require("../models/totalize.models")

exports.listAll = async (req, res) => {
    await orcamentoVendaItem.findAll({
        where: {
            inativo: false
        }
    }).then(OrcamentoVendaItems => {
        res.status(200).send(OrcamentoVendaItems);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.create = async (req, res) => {
    await orcamentoVendaItem.create(req.body).then(OrcamentoVendaItem => {
        res.status(201).send(OrcamentoVendaItem);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVendaItem.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(OrcamentoVendaItem => {
        res.status(200).send(OrcamentoVendaItem);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.update = async (req, res) => {
    const { idProduto,
        descricaoProduto,
        quantidade,
        valor,
        idOrcamentoVenda } = req.body;
    const id = parseInt(req.params.id);
    
    try {
        const [rowsUpdate] = await orcamentoVendaItem.update({
            idProduto,
            descricaoProduto,
            quantidade,
            valor,
            idOrcamentoVenda
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await orcamentoVendaItem.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await orcamentoVendaItem.update({
        inativo: true
    }, {
        where: {
            id
        }
    }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(err);
    })
};