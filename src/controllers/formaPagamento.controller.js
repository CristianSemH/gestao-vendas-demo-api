
const { formaPagamento } = require("../models")
const treatment = require('./errorReturn');
const { Op } = require("sequelize")


exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await formaPagamento.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            descricao: {
                [Op.like]: '%' + filter + '%'
            }
        },
        offset,
        ...(limit > 0 && { limit })
    }).then(({ count, rows }) => {
        res.status(200).send({ rows, count });
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {
    await formaPagamento.create(req.body).then(FormaPagamento => {
        res.status(201).send(FormaPagamento);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await formaPagamento.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(FormaPagamento => {
        res.status(200).send(FormaPagamento);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { descricao } = req.body;
    const id = parseInt(req.params.id);

    try {
        const [rowsUpdate] = await formaPagamento.update({
            descricao
        }, {
            returning: true,
            where: {
                id
            }
        })
        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await formaPagamento.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await formaPagamento.update({
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