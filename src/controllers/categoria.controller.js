
const { categoria } = require("../models")
const treatment = require('./errorReturn')
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await categoria.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            inativo: false,
            descricao: {
                [Op.like]: '%' + filter + '%'
            }
        },
        offset,
        ...(limit > 0 && { limit }),
    }).then(({ count, rows }) => {
        res.status(200).send({ rows, count });
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {
    await categoria.create(req.body).then(Categoria => {
        res.status(201).send(Categoria);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await categoria.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(Categoria => {
        res.status(200).send(Categoria);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {
    const { descricao } = req.body;
    const id = parseInt(req.params.id);


    try {
        const [rowsUpdate] = await categoria.update({
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

        const atualizado = await categoria.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await categoria.update({
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