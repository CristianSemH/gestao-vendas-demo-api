
const { cidade } = require("../models")

exports.listAll = async (req, res) => {
    await cidade.findAll().then(Cidades => {
        res.status(200).send(Cidades);
    }).catch(err => {
        res.status(400).send(err);
    })
};
exports.listAllforEstado = async (req, res) => {
    const idEstado = parseInt(req.params.estadoId);
    await cidade.findAll({
        where: {
            idEstado
        }
    }).then(Cidades => {
        res.status(200).send(Cidades);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.create = async (req, res) => {
    await cidade.create(req.body).then(Cidade => {
        res.status(201).send(Cidade);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await cidade.findByPk(id).then(Cidade => {
        res.status(200).send(Cidade);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.update = async (req, res) => {
    const { nome, idEstado } = req.body;
    const id = parseInt(req.params.id);
    try {
        const [rowsUpdate] = await cidade.update({
            nome,
            idEstado
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await cidade.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await cidade.destroy({ where: { id } }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(err);
    })
};