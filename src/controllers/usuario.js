const path = require("path");

module.exports = {
    formularioUsuario: (req,res)=> res.render("formularioUsuario"),

    formularioRegistro: (req,res)=> res.render("formularioRegistro"),

    carrito: (req,res)=> res.render("carrito")
}
