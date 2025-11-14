const tipoEndereco = (sequelize, DataTypes) => {
    const TipoEndereco = sequelize.define('TipoEndereco', {
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
        inativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'tipoEndereco'
    })

    return TipoEndereco;
}

module.exports = tipoEndereco;