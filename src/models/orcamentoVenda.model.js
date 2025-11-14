const orcamentoVenda = (sequelize, DataTypes) => {
    const OrcamentoVenda = sequelize.define('OrcamentoVenda', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dataAbertura: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a data abertura',
                },
                notEmpty: {
                    msg: "Informe a data abertura"
                }
            }
        },
        dataVenda: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        idSituacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tiposituacao',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe a situação'
                },
                notEmpty: {
                    msg: "Informe a situação"
                }
            }
        },
        tipo: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o tipo'
                },
                isIn: {
                    args: [['O', 'V']],
                    msg: "Tipo inválido"
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
        idClienteEndereco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'endereco',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o endereço'
                },
                notEmpty: {
                    msg: "Informe o endereço"
                }
            }
        },
        idFormaPagamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'formaPagamento',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe a forma pagamento'
                },
                notEmpty: {
                    msg: "Informe a forma pagamento"
                }
            }
        },
        subTotal: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            defaultValue: 0
        },
        valorTotal: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            defaultValue: 0
        },
        desconto: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            defaultValue: 0
        },
        frete: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            defaultValue: 0
        },
        observacao: {
            type: DataTypes.STRING(1200),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 1200],
                    msg: "Observação inválida"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'orcamentoVenda'
    })

    return OrcamentoVenda;
}

module.exports = orcamentoVenda;