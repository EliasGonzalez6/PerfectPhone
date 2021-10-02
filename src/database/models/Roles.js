module.exports = function(sequelize, dataTypes){
    let alias = "Roles";

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
            type: dataTypes.INTEGER(1),
            defaultValue:0,
            allowNull:false
        },
        read: {
            type: dataTypes.INTEGER(1),
            defaultValue:0,
            allowNull:false
        },
        update: {
            type: dataTypes.INTEGER(1),
            defaultValue:0,
            allowNull:false
        },
        delete: {
            type: dataTypes.INTEGER(1),
            defaultValue:0,
            allowNull:false
        }
    }

    let config = {
        tableName: "roles",
        timestamps: false
    }

    let Roles = sequelize.define(alias, cols, config);

    Roles.associate = (models) => {
        Roles.hasmany(models.Users, {
            as:"users",
            foreignKey:"rol"
        })
    }

    return Roles;
}