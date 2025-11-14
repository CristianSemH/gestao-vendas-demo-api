const orcamentoVendaItem = (sequelize, DataTypes) => {
    const OrcamentoVendaItem = sequelize.define('OrcamentoVendaItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idProduto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'produto',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o produto'
                },
                notEmpty: {
                    msg: "Informe o produto"
                }
            }
        },
        descricaoProduto: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a descrição produto'
                },
                len: {
                    args: [1, 100],
                    msg: "Descrição inválida"
                }
            }
        },
        quantidade: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a quantidade'
                },
                notEmpty: {
                    msg: "Informe a quantidade"
                }
            }
        },
        valor: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o valor'
                },
                notEmpty: {
                    msg: "Informe  o valor"
                }
            }
        },
        idOrcamentoVenda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orcamentoVenda',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o orçamento/venda'
                },
                notEmpty: {
                    msg: "Informe o orçamento/venda"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'orcamentoVendaItem'
    })

    return OrcamentoVendaItem;
}

module.exports = orcamentoVendaItem;