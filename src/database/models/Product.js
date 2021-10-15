module.exports = function(sequelize, dataTypes){
    let alias = "Product";

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
        description: {
            type: dataTypes.STRING(500),
            allowNull:true
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull:true
        },
        price: {
            type: dataTypes.DECIMAL(10,2),
            allowNull:false
        },
        stock: {
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        color: {
            type: dataTypes.STRING(20),
            allowNull:true
        },
        brand: {
            type: dataTypes.INTEGER(11),
            allowNull:true            
        },
        category: {
            type: dataTypes.INTEGER(11),
            allowNull:true            
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        
        Product.hasMany(models.Saledetail, {
            as:"saledetails",
            foreignKey:"product"
        }),

        Product.belongsTo(models.Brand, {
            as:"brands",
            foreignKey:"brand"
        }),

        Product.belongsTo(models.Category, {
            as:"categories",
            foreignKey:"category"
        }),

        Product.belongsTo(models.Color, {
            as:"colors",
            foreignKey:"color"
        })
    }

    return Product;
}