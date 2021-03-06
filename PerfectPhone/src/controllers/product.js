const product = require('../models/product');
const color = require('../models/color');
const brand = require('../models/brand');

const {
	validationResult
} = require('express-validator');

module.exports = {
    index:(req,res) => res.render("product/lista",{list:product.allWithExtra()}),
    show: (req,res) => res.render("product/detalles",{product:product.one(req.params.id)}),
    create: (req,res) => res.render("product/crear",{colors:color.all(),brands:brand.all()}),
   /*  save: (req,res) => {
        let result = product.new(req.body,req.file)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    }, */

     save: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("product/crear", {
				brands:brand.all(),
                colors:color.all(),
                errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        else {
            let result = product.new(req.body,req.file)
            return result == true ? res.redirect("/") : res.send("Error al cargar la informacion")
         }
    },

    edit: (req,res) => res.render("product/editar",{product:product.one(req.params.id),colors: color.all(),brands:brand.all()}),
    update: (req,res) =>{
        let result = product.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    },
    delete: (req,res) => {
        let result = product.delete(req.params.id);
        return result == true ? res.redirect("/") : res.send("Error al cargar la informacion") 
    }
}