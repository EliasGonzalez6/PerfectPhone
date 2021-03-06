module.exports = function(sequelize, dataTypes){
    let alias = "Saledetail";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        sale: {
            type: dataTypes.INTEGER(11),
            allowNull:false            
        },
        product: {
            type: dataTypes.INTEGER(11),
            allowNull:false            
        },
        quantities: {
            type: dataTypes.INTEGER(11),
            allowNull:false,
            defaultValue:1
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
        }
    }

    let config = {
        tableName: "saledetails",
        timestamps: false
    }

    let Saledetail = sequelize.define(alias, cols, config);

    Saledetail.associate = function(models) {
       
        Saledetail.belongsTo(models.Sale, {
            as:"saledetails",
            foreignKey:"sale"
        }),(models.Product, {
            as:"saledetails",
            foreignKey:"product"
        })
    }

    return Saledetail
}