module.exports = function(sequelize, dataTypes){
    let alias = "Brand";

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
        tableName: "brands",
        timestamps: false
    }

    let Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models) => {
        Brand.hasmany(models.Product, {
            as:"products",
            foreignKey:"brand"
        })
    }

    return Brand;
}