const endereco = (sequelize, DataTypes) => {
    const Endereco = sequelize.define('Endereco', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idTipoEndereco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipoEndereco',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o tipo endereço'
                },
                min: {
                    args: 1,
                    msg: "Informe o tipo endereço"
                }
            }
        },
        EnderecoPadrao: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        cep: {
            type: DataTypes.CHAR(9),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o CEP'
                },
                is: {
                    args: /^[0-9]{5}\-[0-9]{3}$/i,
                    msg: "CEP inválido"
                }
            }
        },
        logradouro: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o logradouro'
                },
                notEmpty: {
                    msg: "Informe o logradouro"
                },
                len: {
                    args: [1, 100],
                    msg: "Logradouro inválido"
                }
            }
        },
        numero: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o número'
                },
                notEmpty: {
                    msg: "Informe o número"
                },
                len: {
                    args: [1, 20],
                    msg: "Número inválido"
                }
            }
        },
        bairro: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o bairro'
                },
                notEmpty: {
                    msg: "Informe o bairro"
                },
                len: {
                    args: [1, 20],
                    msg: "Bairro inválido"
                }
            }
        },
        complemento: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: "",
            validate: {
                len: {
                    args: [1, 20],
                    msg: "Complemento inválido"
                }
            }
        },
        referencia: {
            type: DataTypes.STRING(20),
            allowNull: true,
            defaultValue: "",
            validate: {
                max: {
                    args: 20,
                    msg: "Referência inválido"
                }
            }
        },
        IdCidade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cidade',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe a cidade'
                },
                min: {
                    args: 1,
                    msg: "Informe a cidade"
                }
            }
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'cliente',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o cliente'
                },
                notEmpty: {
                    msg: "Informe o cliente"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'endereco'
    })

    return Endereco;
}

module.exports = endereco;