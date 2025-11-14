
const { estado, cidade } = require("../models")
const cep = require("../BrasilApi/cep")
const { Op } = require("sequelize")

exports.listAll = async (req, res) => {

    const codCep = req.params.codCep.replace('-', '');

    const re = new RegExp("^[0-9]{5}[0-9]{3}$");

    if (re.test(codCep)) {
        const Cep = await cep.searchCep(codCep)

        if (!Cep?.code) {
            const Cidade = await cidade.findOne({
                where: {
                    nome: {
                        [Op.like]: '%' + Cep.city + '%'
                    },
                    '$Estado.sigla$': {
                        [Op.like]: '%' + Cep.state + '%'
                    }
                },
                include: [
                    {
                        model: estado,
                        required: false
                    }
                ]
            })

            const infoCep = {
                logradouro: Cep.street,
                bairro: Cep.neighborhood,
                idEstado: Cidade.Estado.id,
                idCidade: Cidade.id
            }

            res.status(200).send(infoCep);
        } else {
            res.status(400).send({ message: 'Erro ao consultar CEP' });
        }
    } else {
        res.status(400).send({ message: 'CEP inválido' });
    }

};