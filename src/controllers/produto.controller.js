
const { produto, categoria } = require("../models")
const treatment = require('./errorReturn')
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await produto.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            [Op.or]: [
                {
                    descricao: {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$categoria.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                }
            ]
        },
        include: {
            model: categoria,
            as: 'categoria',
            required: false
        },
        offset,
        ...(limit > 0 && { limit })
    }).then(({ count, rows }) => {
        res.status(200).send({ rows, count });
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.listAllFilter = async (req, res) => {
    const filter = req.params.filter;
    await produto.findAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            [Op.or]: [
                {
                    descricao: {
                        [Op.like]: '%' + filter + '%'
                    }
                },
                {
                    '$categoria.descricao$': {
                        [Op.like]: '%' + filter + '%'
                    }
                }
            ]
        },
        include: {
            model: categoria,
            as: 'categoria',
            required: false
        }
    }).then(Clientes => {
        res.status(200).send(Clientes);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {
    await produto.create(req.body).then(Produto => {
        res.status(201).send(Produto);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await produto.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(Produto => {
        res.status(200).send(Produto);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { descricao, idCategoria, valorVenda, custoCompra } = req.body;
    const id = parseInt(req.params.id, 10);

    try {
        const [rowsUpdate] = await produto.update(
            { descricao, idCategoria, valorVenda, custoCompra },
            {
                where: { id },
                returning: true
            }
        );

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const produtoAtualizado = await produto.findByPk(id);

        return res.status(200).json(produtoAtualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};


exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await produto.update({
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