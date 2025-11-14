const estado = (sequelize, DataTypes) => {
    const Estado = sequelize.define('Estado', {
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
                    msg: "Nome inválida"
                }
            }
        },
        sigla: {
            type: DataTypes.CHAR(2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Informe o sigla'
                },
                len: {
                    args: [1, 2],
                    msg: "Sigla inválida"
                }
            }
        }
    }, {
        tableName: 'estado'
    })

    return Estado;
}

module.exports = estado;