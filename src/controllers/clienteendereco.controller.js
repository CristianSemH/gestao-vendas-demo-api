
const { endereco, cliente, cidade, estado } = require("../models")
const { Op } = require("sequelize");
const treatment = require('./errorReturn');

exports.listAll = async (req, res) => {
    await cliente.findAll({
        where: {
            inativo: false
        },
        include: [
            {
                model: endereco,
                required: false
            }
        ],
        order: [
            ['id', 'DESC']
        ]
    }).then(Clientes => {
        res.status(200).send(Clientes);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.create = async (req, res) => {

    const Enderecos = req.body.Enderecos.map(Endereco => {
        return {
            idTipoEndereco: Endereco.idTipoEndereco,
            EnderecoPadrao: Endereco.EnderecoPadrao,
            cep: Endereco.cep,
            logradouro: Endereco.logradouro,
            numero: Endereco.numero,
            bairro: Endereco.bairro,
            complemento: Endereco.complemento,
            referencia: Endereco.referencia,
            IdCidade: Endereco.IdCidade
        }
    })

    let validateEndereco = []
    for (const Endereco of Enderecos) {
        validateEndereco = await endereco.build(Endereco).validate()
            .then(() => {
                return []
            })
            .catch(error => {
                return treatment.messages(error)
            });

        if (validateEndereco.length > 0) {
            break
        }
    }

    const clienteEnderecos = {
        nome: req.body.nome,
        TipoPessoa: req.body.TipoPessoa,
        cpf: req.body.cpf,
        cnpj: req.body.cnpj,
        celular: req.body.celular,
        Enderecos: Enderecos
    }

    const errorEndereco = validateEndereco.filter((value) => { return value.message !== "Informe o cliente" })

    if (errorEndereco.length == 0) {
        await cliente.create(
            clienteEnderecos,
            {
                include: {
                    model: endereco,
                    required: false
                }
            }).then(Clientes => {
                res.status(200).send(Clientes);
            }).catch(err => {
                res.status(400).send(treatment.messages(err))
            })

    } else {
        res.status(400).send(errorEndereco);
    }
};

exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await cliente.findOne({
        where: {
            inativo: false,
            id
        },
        include: [
            {
                model: endereco,
                where: {
                    inativo: false,
                },
                required: false,
                include: [{
                    model: cidade,
                    required: false,
                    include: [{
                        model: estado,
                        required: false
                    }]
                }]
            },

        ]
    }).then(ClienteEndereco => {
        res.status(200).send(ClienteEndereco);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
}

exports.update = async (req, res) => {

    const id = parseInt(req.params.id);

    const Enderecos = req.body.Enderecos.map(Endereco => {
        return {
            idCliente: id,
            id: Endereco.id,
            idTipoEndereco: Endereco.idTipoEndereco,
            EnderecoPadrao: Endereco.EnderecoPadrao,
            cep: Endereco.cep,
            logradouro: Endereco.logradouro,
            numero: Endereco.numero,
            bairro: Endereco.bairro,
            complemento: Endereco.complemento,
            referencia: Endereco.referencia,
            IdCidade: Endereco.IdCidade
        }
    })

    var EnderecosId = Enderecos.map(Endereco => { return Endereco.id > 0 ? Endereco.id : 0 })

    const Cliente = {
        nome: req.body.nome,
        TipoPessoa: req.body.TipoPessoa,
        cpf: req.body.cpf,
        cnpj: req.body.cnpj,
        celular: req.body.celular,
    }

    const validateCliente = await cliente.build(Cliente).validate()
        .then(() => {
            return { errors: [] }
        })
        .catch(error => {
            return treatment.messages(error)
        });

    let validateEndereco = []
    for (const Endereco of Enderecos) {
        validateEndereco = await endereco.build(Endereco).validate()
            .then(() => {
                return []
            })
            .catch(error => {
                return treatment.messages(error)
            });

        if (validateEndereco.length > 0) {
            break
        }
    }

    if (validateCliente.length > 0) {
        res.status(400).send(validateCliente);
    } else if (validateEndereco.length > 0) {
        res.status(400).send(validateEndereco);
    } else {

        await cliente.update(Cliente,
            {
                where: {
                    id: id
                }
            })

        for (const Endereco of Enderecos) {
            if (Endereco.id) {
                await endereco.update(Endereco,
                    {
                        where: {
                            id: Endereco.id
                        }
                    })
            } else {
                delete Endereco.id;
                const novoEndereco = await endereco.create(Endereco, { returning: true })
                EnderecosId.push(novoEndereco.id)
            }
        }

        await endereco.update({ inativo: true },
            {
                where: {
                    id: { [Op.notIn]: EnderecosId },
                    idCliente: id
                }
            })

        await cliente.findOne({
            where: {
                inativo: false,
                id: id
            },
            include: {
                model: endereco,
                where: {
                    inativo: false
                }
            }
        }).then(ClienteEndereco => {
            res.status(200).send(ClienteEndereco);
        }).catch(err => {
            res.status(400).send(treatment.messages(err))
        })
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
        res.status(400).send(treatment.messages(err))
    })
};