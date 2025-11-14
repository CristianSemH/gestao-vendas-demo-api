
const { user } = require("../models")
const { Op } = require("sequelize")
const treatment = require('./errorReturn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.listAll = async (req, res) => {

    const offset = req.params.offset;
    const limit = req.params.limit;
    const filter = req.params.filter ? req.params.filter : '';

    await user.findAndCountAll({
        order: [
            ['id', 'ASC']],
        where: {
            usuario: {
                [Op.like]: '%' + filter + '%'
            },
            visivel: true
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

    const username = req.body.usuario;
    const password = req.body.senha;
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({ usuario: username, senha: hashedPassword }).then(User => {
        res.status(201).send(User);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.login = async (req, res) => {

    const username = req.body.usuario;
    const password = req.body.senha;

    const User = await user.findOne({ where: { usuario: username } });

    if (!User) {
        return res.status(401).json([{ message: 'Usuário ou senha incorreta' }]);
    }

    const passwordMatch = await bcrypt.compare(password, User.senha);
    if (!passwordMatch) {
        return res.status(401).json([{ message: 'Usuário ou senha incorreta' }]);
    }
    const token = jwt.sign({ userId: user._id }, '35140c9d-eeb2-400e-8158-b82c2c64a262', {
        expiresIn: '1d',
    });
    res.status(200).json({ token });
};


exports.findById = async (req, res) => {
    const id = parseInt(req.params.id);
    await user.findOne({
        where: {
            id,
            visivel: true
        }
    }).then(User => {
        res.status(200).send(User);
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.update = async (req, res) => {
    const { senha, usuario } = req.body;
    const id = parseInt(req.params.id);
    const hashedPassword = await bcrypt.hash(senha, 10);

    try {
        const [rowsUpdate] = await user.update({
            usuario,
            senha: hashedPassword
        }, {
            returning: true,
            where: {
                id
            }
        })

        if (rowsUpdate === 0) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }

        const atualizado = await user.findByPk(id);

        return res.status(200).json(atualizado);

    } catch (err) {
        res.status(400).send(treatment.messages(err))
    }
};

exports.delete = async (req, res) => {
    const id = parseInt(req.params.id);
    await user.destroy({ where: { id } }).then(() => {
        res.status(200).send("deletado com sucesso");
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};

exports.createDefaultUser = async (req, res) => {

    const username = 'admin.demo';
    const password = 'admin.demo';
    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({ usuario: username, senha: hashedPassword }).then(User => {
        res.status(201).send();
    }).catch(err => {
        res.status(400).send(treatment.messages(err))
    })
};