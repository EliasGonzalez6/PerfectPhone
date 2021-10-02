module.exports = function(sequelize, dataTypes){
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        fullname: {
            type: dataTypes.STRING(100),
            allowNull:false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull:false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull:false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull:true
        },
        rol: {
            type: dataTypes.INTEGER(11),
            allowNull:false,
            unique:true
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate =function(models) {
        User.belongsTo(models.Rol, {
            as:"users",
            foreignKey:"rol"
        }),

        User.hasMany(models.Sale, {
            as:"sales",
            foreignKey:"user"
        })
    }

    return User;
}