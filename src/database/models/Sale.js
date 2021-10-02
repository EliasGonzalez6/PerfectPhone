module.exports = function(sequelize, dataTypes){
    let alias = "Sale";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        codesale: {
            type: dataTypes.STRING(10),
            allowNull:true
        },
        user: {
            type: dataTypes.INTEGER(11),
            allowNull:false,
            unique:true
        },
        subtotal: {
            type: dataTypes.DECIMAL(10,4),
            allowNull:true
        },
        discount: {
            type: dataTypes.DECIMAL(10,4),
            allowNull:true
        },
        total: {
            type: dataTypes.DECIMAL(10,4),
            allowNull:true
        },
        datesale: {
            type: dataTypes.DATE(),
            allowNull:true
        }
    }

    let config = {
        tableName: "sales",
        timestamps: false
    }

    let Sale = sequelize.define(alias, cols, config);

    Sale.associate = function(models) {
        Sale.hasMany(models.Saledetail, {
            as:"saledetails",
            foreignKey:"sale"
        }),

        Sale.belongsTo(models.User, {
            as:"sales",
            foreignKey:"user"
        })
    }

    return Sale;
}