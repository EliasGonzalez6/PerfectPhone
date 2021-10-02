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
        create: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        read: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        update: {
            type: dataTypes.TINYINT(1),
            defaultValue:0,
            allowNull:false
        },
        delete: {
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

    Rol.associate = (models) => {
        Rol.hasmany(models.User, {
            as:"users",
            foreignKey:"rol"
        })
    }

    return Rol;
}