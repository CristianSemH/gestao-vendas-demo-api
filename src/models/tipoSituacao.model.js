const tipoSituacao = (sequelize, DataTypes) => {
    const TipoSituacao = sequelize.define('TipoSituacao', {
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
                    msg: "Cor da fonte inválida"
                }
            }
        },
        baseSituacao: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe a base situação'
                },
                len: {
                    args: [1, 20],
                    msg: "Base situação incorreta"
                },
                isIn: {
                    args: [['Pendente', 'Finalizado', 'Em Aberto', 'Cancelado', 'Pago']],
                    msg: "Base situação inválida"
                }
            }
        },
        tipo: {
            type: DataTypes.CHAR(1),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o tipo situação'
                },
                isIn: {
                    args: [['D', 'V']],
                    msg: "Tipo situação inválida"
                }
            }
        },
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'tiposituacao'
    })

    return TipoSituacao;
}

module.exports = tipoSituacao;