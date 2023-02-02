module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
        }
    });
    User.associate = models => {
        User.hasMany(models.Product, {
            onDelete: 'cascade'
        });
        User.hasMany(models.Review, {
            onDelete: 'cascade'
        });
    }
    return User;
}