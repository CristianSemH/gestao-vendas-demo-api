
const { tipoSituacao } = require("../models")
const treatment = require('./errorReturn')
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';
    const tipo = TipoValidar(req.params.tipo, res)

    await tipoSituacao.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            tipo,
            inativo: false,
            [Op.or]: [
                {
                    descricao: {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    baseSituacao: {
                        [Op.like]: '%' + filter + '%'
                    }
                }
            ]
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
    const tipoSituacaoReq = req.body

    tipoSituacaoReq.tipo = TipoValidar(req.params.tipo, res)

    await tipoSituacao.create(tipoSituacaoReq).then(TipoSituacao => {
        res.status(201).send(TipoSituacao);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const tipo = TipoValidar(req.params.tipo, res)
    const id = parseInt(req.params.id);

    await tipoSituacao.findOne({
        where: {
            id,
            tipo,
            inativo: false
        }
    }).then(TipoSituacao => {
        res.status(200).send(TipoSituacao);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { descricao, corHexaDecimalFundo, corHexaDecimalFonte, Tipo, baseSituacao } = req.body;
    const id = parseInt(req.params.id);
    const tipo = TipoValidar(req.params.tipo, res)

    try {
        const [rowsUpdate] = await tipoSituacao.update({
            descricao,
            corHexaDecimalFundo,
            corHexaDecimalFonte,
            baseSituacao
        }, {
            returning: true,
            where: {
                id: req.params.id,
                tipo
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await tipoSituacao.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    const tipo = TipoValidar(req.params.tipo, res)

    await tipoSituacao.update({
        inativo: true
    }, {
        where: {
            id,
            tipo
        }
    }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

function TipoValidar(TipoParm, res) {
    var tipo = "V";

    switch (TipoParm) {
        case "venda":
            return tipo = "V"

        case "despesa":
            return tipo = "D"

        default:
            res.status(400).send("informe tipo venda ou despesa");
            return
    }
} 