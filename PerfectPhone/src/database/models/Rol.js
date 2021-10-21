module.exports = function(sequelize, dataTypes){
    let alias = "Rol";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull:false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(15),
            allowNull:false
        },
        crear: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        leer: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        editar: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        borrar: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        }
    }

    let config = {
        tableName: "roles",
        timestamps: false
    }

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = function(models) {
        Rol.hasMany(models.User, {
            as:"users",
            foreignKey:"rol"
        })
    }

    return Rol;
}