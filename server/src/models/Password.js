const Password = (sequelize, DataTypes) => {
    return sequelize.define('password', {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false
        },
        domainName: {
            type: DataTypes.STRING
        },
        encryptedPassword: {
            type: DataTypes.STRING
        }
    })
}

module.exports = Password