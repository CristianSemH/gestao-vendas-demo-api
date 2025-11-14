const tipoGasto = (sequelize, DataTypes) => {
    const TipoGasto = sequelize.define('TipoGasto', {
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
        corHexaDecimalFundo: {
            type: DataTypes.CHAR(7),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a cor de fundo'
                },
                len: {
                    args: [1, 7],
                    msg: "Cor de fundo inválida"
                }
            }
        },
        corHexaDecimalFonte: {
            type: DataTypes.CHAR(7),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a cor da fonte'
                },
                len: {
                    args: [1, 7],
                    msg: "Cor de fonte inválida"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'tipoGasto'
    })

    return TipoGasto;
}

module.exports = tipoGasto;