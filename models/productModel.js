module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT,
        },
        published: {
            type: DataTypes.BOOLEAN,
        },
        user_id: {
            type:DataTypes.INTEGER
        }
    });
    Product.associate = models => {
        Product.hasMany(models.Review, {
            onDelete: 'cascade'
        });
        Product.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Product;
}