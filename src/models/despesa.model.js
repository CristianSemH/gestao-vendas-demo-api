const despesa = (sequelize, DataTypes) => {
    const Despesa = sequelize.define('Despesa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descricao: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a descrição'
                },
                len: {
                    args: [1, 100],
                    msg: "Descrição inválida"
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
        valorTotal: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            defaultValue: 0
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
        idTipoGasto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tipoGasto',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o tipo gasto'
                },
                notEmpty: {
                    msg: "Informe o tipo gasto"
                }
            }
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
        dataPagamento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '0001-01-01'
        }
    }, {
        tableName: 'despesa'
    })

    return Despesa;
}

module.exports = despesa;