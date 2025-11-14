
const { despesa, tipoSituacao, tipoGasto, formaPagamento } = require("../models")
const treatment = require('./errorReturn')
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await despesa.findAndCountAll({
        where: {
            inativo: false,
            [Op.or]: [
                {
                    descricao: {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$TipoSituacao.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$TipoGasto.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$FormaPagamento.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                }
            ]
        },
        include: [
            {
                model: tipoSituacao,
                required: false
            },
            {
                model: tipoGasto,
                required: false
            },
            {
                model: formaPagamento,
                required: false
            }
        ],
        offset,
        ...(limit > 0 && { limit })
    }).then(({ count, rows }) => {
        res.status(200).send({ rows, count });
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};


exports.create = async (req, res) => {
    await despesa.create(req.body).then(Despesa => {
        res.status(201).send(Despesa);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await despesa.findOne({
        where: {
            inativo: false,
            id
        }, include: [
            {
                model: tipoSituacao,
                required: false
            },
            {
                model: tipoGasto,
                required: false
            },
            {
                model: formaPagamento,
                required: false
            }
        ]
    }).then(Despesa => {
        res.status(200).send(Despesa);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {

    const { descricao,
        dataAbertura,
        dataPagamento,
        idSituacao,
        idTipoGasto,
        idFormaPagamento,
        observacao,
        valorTotal } = req.body;
    const id = parseInt(req.params.id);

    try {
        const [rowsUpdate] = await despesa.update({
            descricao,
            dataAbertura,
            dataPagamento,
            idSituacao,
            idTipoGasto,
            idFormaPagamento,
            observacao,
            valorTotal
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await despesa.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await despesa.update({
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