const { body } = require('express-validator');

export const validateStore = [
    body('descripcion')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('El campo solo puede contener letras y espacios')
        .isLength({min: 3, max: 20}).withMessage('El campo debe tener entre 5 y 20 caracteres'),
     
   
]