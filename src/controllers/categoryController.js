const db = require("../database/models/index");

const categoryController = {

    create: (req, res) => {
        db.Category.findByPk(req.params.id)
            .then(function(categories){
            res.render("category/crear")
        })
    },
};

module.exports = categoryController;