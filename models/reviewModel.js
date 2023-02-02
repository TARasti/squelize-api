module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define("review", {
        product_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.TEXT
        }
    });
    Review.associate = models => {
        Review.belongsTo(models.Product, {
            foreignKey: {
                allowNull: false
            }
        });
        Review.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Review;
}