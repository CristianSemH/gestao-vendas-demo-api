const cidade = (sequelize, DataTypes) => {
    const Cidade = sequelize.define('Cidade', {
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
        idEstado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estado',
                key: 'id'
            },
            validate: {
                notNull: {
                    msg: 'Informe o estado'
                }
            }
        }
    }, {
        tableName: 'cidade'
    })

    return Cidade;
}

module.exports = cidade;