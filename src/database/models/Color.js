module.exports = function(sequelize, dataTypes){
    let alias = "Color";

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
        codigo: {
            type: dataTypes.STRING(50),
            allowNull:true
        }
    }

    let config = {
        tableName: "colors",
        timestamps: false
    }

    let Color = sequelize.define(alias, cols, config);

    Color.associate = function(models) {
        Color.hasMany(models.Product, {
            as:"products",
            foreignKey:"color"
        })
    }

    return Color;
}