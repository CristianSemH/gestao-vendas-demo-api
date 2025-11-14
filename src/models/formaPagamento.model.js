const formaPagamento = (sequelize, DataTypes) => {
    const FormaPagamento = sequelize.define('FormaPagamento', {
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
        tableName: 'formaPagamento'
    })

    return FormaPagamento;
}

module.exports = formaPagamento;