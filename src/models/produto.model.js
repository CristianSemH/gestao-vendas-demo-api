const produto = (sequelize, DataTypes) => {
    const Produto = sequelize.define('Produto', {
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
        idCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categoria',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe a categoria'
                }
            }
        },
        valorVenda: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o valor de venda'
                }
            }
        },
        custoCompra: {
            type: DataTypes.DECIMAL(16, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o custo'
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'produto'
    })

    return Produto;
}

module.exports = produto;