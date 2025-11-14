
const { endereco } = require("../models")

exports.listAll = async (req, res) => {
    await endereco.findAll({
        where: {
            inativo: false
        }
    }).then(Enderecos => {
        res.status(200).send(Enderecos);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.listAllForCliente = async (req, res) => {

    const id = parseInt(req.params.id);
    await endereco.findAll({
        where: {
            inativo: false,
            idCliente: id
        }
    }).then(Enderecos => {
        res.status(200).send(Enderecos);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.create = async (req, res) => {
    await endereco.create(req.body).then(Endereco => {
        res.status(201).send(Endereco);
    }).catch(err => {
        res.status(400).send(err);
    })
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await endereco.findOne({
        where: {
            inativo: false,
            id
        }
    }).then(Endereco => {
        res.status(200).send(Endereco);
    }).catch(err => {
        res.status(400).send(err);
    })
}

exports.update = async (req, res) => {

    const { idTipoEndereco,
        EnderecoPadrao,
        cep,
        logradouro,
        numero,
        bairro,
        complemento,
        referencia,
        IdCidade,
        idCliente } = req.body;
    const id = parseInt(req.params.id);

    try {
        const [rowsUpdate] = await endereco.update({
            idTipoEndereco,
            EnderecoPadrao,
            cep,
            logradouro,
            numero,
            bairro,
            complemento,
            referencia,
            IdCidade,
            idCliente
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await endereco.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await endereco.update({
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