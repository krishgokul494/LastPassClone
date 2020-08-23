const User = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        masterpassword: {
            type: DataTypes.STRING
        },
        encryptionSalt: {
            type: DataTypes.STRING
        },
        remainder: {
            type: DataTypes.STRING
        }
    })
}

module.exports = User