module.exports = function(sequelize, dataTypes){
    let alias = "Category";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull:false
        },
        detail: {
            type: dataTypes.STRING(100),
            allowNull:true
        }
    }

    let config = {
        tableName: "categories",
        timestamps: false
    }

    let Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasmany(models.Product, {
            as:"products",
            foreignKey:"category"
        })
    }

    return Category;
}