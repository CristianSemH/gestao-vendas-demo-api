const user = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        usuario: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            trim: true,
            validate: {
                notNull: {
                    msg: 'Informe o usuário'
                },
                len: {
                    args: [10, 50],
                    msg: "Usúario precisa ter no miníno 10 caracteres"
                }
            }
        },
        senha: {
            type: DataTypes.STRING(100),
            allowNull: false,
            trim: true,
            validate: {
                notNull: {
                    msg: 'Informe a senha'
                },
                len: {
                    args: [5, 100],
                    msg: "Senha precisa ter no miníno 5 caracteres"
                }
            }
        },
        visivel: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        tableName: 'usuario'
    })

    return User;
}

module.exports = user;
