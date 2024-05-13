const { body } = require('express-validator');

export const validateStore = [
    body('nombre')
        .trim()
        .not().isEmpty().withMessage('El campo nombre es requerido'),

    body('apellido')
        .trim()
        .not().isEmpty().withMessage('El campo apellido es requerido'),

    body('nacionalidad')
        .trim()
        .not().isEmpty().withMessage('El campo nacionalidad es requerido'),

    body('tipo_documento')
        .trim()
        .not().isEmpty().withMessage('El campo tipo_documento es requerido')
        .isMongoId().withMessage('El campo tipo_documento debe ser un identificador MongoDB válido'),

    body('nro_documento')
        .trim()
        .not().isEmpty().withMessage('El campo nro_documento es requerido'),

    body('direccion')
        .trim()
        .not().isEmpty().withMessage('El campo direccion es requerido'),

];