const { body } = require('express-validator');

export const validateStore = [
    body('descripcion')
        .trim()
        .not().isEmpty().withMessage('El campo descripcion es requerido')
        .isLength({ max: 200 }).withMessage('El campo descripcion debe tener como máximo 250 caracteres'),

];
// 