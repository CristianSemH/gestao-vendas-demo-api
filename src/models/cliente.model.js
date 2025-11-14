const cliente = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o nome'
                },
                len: {
                    args: [1, 100],
                    msg: "Nome inválido"
                }
            }
        },
        TipoPessoa: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o tipo pessoa'
                },
                len: {
                    args: [1],
                    msg: "tipo pessoa inválida"
                },
                isIn: {
                    args: [['J', 'F']],
                    msg: "Tipo pessoa inválida"
                }
            }
        },
        cpf: {
            type: DataTypes.STRING(14),
            allowNull: false,
            validate: {
                isPessoaFisica() {
                    const regCpf = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/i;

                    if (this.TipoPessoa === "F" && !regCpf.test(this.cpf)) {
                        throw new Error('CPF inválido');
                    }
                }
            },
            defaultValue: ""
        },
        cnpj: {
            type: DataTypes.STRING(18),
            allowNull: false,
            validate: {
                isPessoaJuridica() {
                    const regCnpj = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}/i;

                    if (this.TipoPessoa === "J" && !regCnpj.test(this.cnpj)) {
                        throw new Error('CNPJ inválido');
                    }
                }
            },
            defaultValue: ""
        },
        celular: {
            type: DataTypes.STRING(14),
            allowNull: false,
            validate: {
                is: {
                    args: /^\([1-9]{2}\)(?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/i,
                    msg: "Celular inválido"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'cliente'
    })

    return Cliente;
}

module.exports = cliente;