
const { estado } = require("../models")

exports.listAll = async (req, res) => {
    await estado.findAll().then(Estados => {
        res.status(200).send(Estados);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.create = async (req, res) => {
    await estado.create(req.body).then(Estado => {
        res.status(201).send(Estado);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await estado.findByPk(id).then(Estado => {
        res.status(200).send(Estado);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.update = async (req, res) => {
    const { nome, sigla } = req.body;
    const id = parseInt(req.params.id);

    try {
        const [rowsUpdate] = await estado.update({
            nome,
            sigla
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await estado.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await estado.destroy({ where: { id } }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(err);
    })
};