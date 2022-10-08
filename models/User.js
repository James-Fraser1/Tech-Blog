const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const saltRounds = 10;

class User extends Model {
    // Compares passwords for each User's entry to make sure user entry contains hashing and salt rounds
    comparePassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password)
    }
}

// User structure created with id, user, email, and pass
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            // Before user logs in, pass the new password through hashing and saltRounds
            async beforeCreate(newPW) {
                newPW.password = await bcrypt.hash(newPW.password, saltRounds);
                return newPW;
            },
            async beforeUpdate(encryptedPW) {
                encryptedPW.password = await bcrypt.hash(encryptedPW.password, saltRounds);
                return encryptedPW;
            }
        },
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'user',
        freezeTableName: true
    }
);

module.exports = User;