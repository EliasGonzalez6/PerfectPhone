const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre').bail() 
	.isLength({min: 5}).withMessage("Debe contener al menos 5 caracteres"),
	body('price').notEmpty().withMessage('Tienes que escribir un precio'),
	body('description').notEmpty().withMessage('Tienes que escribir una descripcion').bail() 
	.isLength({min: 20}).withMessage("Debe contener al menos 20 caracteres"),
	body('brand').notEmpty().withMessage('Tienes que elegir una categoria'),
	body('color').notEmpty().withMessage('Tienes que elegir un color'),
	body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extn(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]