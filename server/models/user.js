'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.Sequelize.Model
    class User extends Model {}
    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error(`Email cannot be empty`)
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error(`Password cannot be empty`)
                    }
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                function(value) {
                    if (value === null || value === '') {
                        throw new Error(`Name cannot be empty`)
                    }
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                return bcrypt.hash(user.password, saltRounds)
                .then(function(hash) {
                    user.password = hash
                });
            }
        },
        sequelize
    })

    User.associate = function(models) {
        // associations can be defined here
    };
    return User;
};