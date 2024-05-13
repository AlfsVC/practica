import { body } from 'express-validator';

export const validateStore = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('El campo no tiene un formato de email válido'),

    
    body('telefono')
        .trim()
        .not().isEmpty().withMessage('El campo telefono es requerido')
        .matches(/^\d{9}$/).withMessage('El telefono debe tener 9 dígitos'),

    
    body('password')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isLength({ min: 5, max: 10 }).withMessage('El campo debe tener entre 5 y 10 caracteres')
        .isAlphanumeric().withMessage('El campo debe contener solo caracteres alfanuméricos'),

    body('persona')
        .trim()
        .isMongoId().withMessage('El campo persona debe ser un ID de MongoDB válido'),
    
    body('isActive')
        .optional()
        .isBoolean().withMessage('El campo isActive debe ser de tipo booleano')
    
];

export const validateLogin = [
    body('email')
        .trim()
        .not().isEmpty().withMessage('El campo email es requerido')
        .isEmail().withMessage('El campo email debe tener un formato válido'),

    body('password')
        .trim()
        .not().isEmpty().withMessage('El campo es requerido')
        .isLength({ min: 5, max: 10 }).withMessage('El campo debe tener entre 5 y 10 caracteres')
        .isAlphanumeric().withMessage('El campo debe contener solo caracteres alfanuméricos'),
];


